import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDatatable } from '@/hooks/useDatatable';
const DataTable = ({ endpoint, title, itemsPerPage, selectableColumns }) => {
    const [sortedData, setSortedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState(
        selectableColumns || [],
    );
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [expandedRows, setExpandedRows] = useState([]);
    const {
        userDetails,
        setUserDetails,
        data,
        fetchUserData,
        fetchAllUsersData,
        deleteUser,
    } = useDatatable();

    useEffect(() => {
        fetchAllUsersData();
        if (selectedRow !== null) {
            fetchUserData(selectedRow);
        }
    }, [fetchAllUsersData, fetchUserData, selectedRow]);

    const getHighestRoleLabel = (roles) => {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        const roleHierarchy = {
            ROLE_USER: 1,
            ROLE_TEACHER: 2,
            ROLE_PROVIDER: 3,
            ROLE_ADMIN: 4,
        };

        const roleLabels = {
            ROLE_USER: 'Utilisateur',
            ROLE_TEACHER: 'Enseignant',
            ROLE_PROVIDER: 'Fournisseur',
            ROLE_ADMIN: 'Administrateur',
        };

        let highestRole = roles.reduce((prev, current) => {
            return roleHierarchy[current] > roleHierarchy[prev]
                ? current
                : prev;
        }, 'ROLE_USER');

        return roleLabels[highestRole];
    };

    const updateAndTransformData = useCallback((dataToTransform) => {
        const transformedData = dataToTransform.map((user) => {
            const highestRoleLabel = getHighestRoleLabel(user.roles);
            return { ...user, roles: highestRoleLabel };
        });
        setSortedData(transformedData);
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            const firstItem = data[0];
            const columns = Object.keys(firstItem).filter((column) =>
                selectedColumns.includes(column),
            );
            setColumns(columns);

            const validSortColumn =
                sortColumn && columns.includes(sortColumn) ? sortColumn : 'id';

            const sorted = [...data].sort((a, b) => {
                const valueA = a[validSortColumn];
                const valueB = b[validSortColumn];

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return sortOrder === 'asc'
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                } else if (
                    typeof valueA === 'number' &&
                    typeof valueB === 'number'
                ) {
                    return sortOrder === 'asc'
                        ? valueA - valueB
                        : valueB - valueA;
                } else {
                    return 0;
                }
            });

            setSortedData(sorted);
        }
    }, [data, sortColumn, sortOrder, searchTerm, selectedColumns]);

    useEffect(() => {
        if (data && data.length > 0) {
            const transformedData = data.map((user) => {
                const highestRoleLabel = getHighestRoleLabel(user.roles);
                return { ...user, roles: highestRoleLabel };
            });
            setSortedData(transformedData);
        }
    }, [data]);

    useEffect(() => {
        if (data && data.length > 0) {
            updateAndTransformData(data);
        }
    }, [data, updateAndTransformData]);

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortColumn(column);

        const sortedAndTransformedData = data
            .map((user) => {
                return { ...user, roles: getHighestRoleLabel(user.roles) };
            })
            .sort((a, b) => {
                let valueA = a[column];
                let valueB = b[column];

                // Si le tri est sur les rôles, utilisez les labels transformés
                if (column === 'roles') {
                    valueA = getHighestRoleLabel(a.roles);
                    valueB = getHighestRoleLabel(b.roles);
                }

                if (typeof valueA === 'string') valueA = valueA.toLowerCase();
                if (typeof valueB === 'string') valueB = valueB.toLowerCase();

                if (valueA < valueB) return isAsc ? -1 : 1;
                if (valueA > valueB) return isAsc ? 1 : -1;
                return 0;
            });

        setSortedData(sortedAndTransformedData);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (!searchTerm.trim()) {
            updateAndTransformData(data);
            setCurrentPage(1);
            return;
        }

        const filteredData = data.filter((user) => {
            return Object.values(user)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm);
        });

        updateAndTransformData(filteredData);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        if (
            pageNumber >= 1 &&
            pageNumber <= Math.ceil(data.length / itemsPerPage)
        ) {
            setCurrentPage(pageNumber);
        }
    };

    const handleRowClick = (userId) => {
        setExpandedRows((prevExpandedRows) =>
            prevExpandedRows.includes(userId)
                ? prevExpandedRows.filter((rowId) => rowId !== userId)
                : [...prevExpandedRows, userId],
        );
        setSelectedRow(userId);
    };

    const handleRowSelection = (rowId) => {
        const updatedSelectedRows = selectedRows.includes(rowId)
            ? selectedRows.filter((selectedRow) => selectedRow !== rowId)
            : [...selectedRows, rowId];
        setSelectedRows(updatedSelectedRows);
    };

    const handleDelete = async (userId, event) => {
        event.preventDefault();
        event.stopPropagation();

        // Display confirmation dialog
        const isConfirmed = window.confirm(
            'Are you sure you want to delete this user?',
        );

        if (isConfirmed) {
            try {
                await deleteUser(userId);

                setSortedData((prevData) =>
                    prevData.filter((row) => row.id !== userId),
                );

                if (selectedRow === userId) {
                    setSelectedRow(null);
                    setUserDetails(null);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedRows.map((userId) => deleteUser(userId)));
            sortedData(endpoint);
            setSelectedRows([]);
        } catch (error) {
            console.error('Error deleting selected users:', error);
        }
    };

    const handleEditUser = (userId, event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = sortedData
        .filter((row) =>
            columns.some((column) =>
                String(row[column]).toLowerCase().includes(searchTerm),
            ),
        )
        .slice(startIndex, endIndex);

    return (
        <div className="overflow-x-auto">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
            </h2>
            <div className="flex items-center justify-between mb-4">
                <div className="relative w-40">
                    <input
                        type="text"
                        className="w-full h-10 pl-4 pr-10 text-sm border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                            className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </span>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="p-4 w-1/12">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="hidden"
                                />
                                <label
                                    htmlFor="checkbox-all-search"
                                    className="sr-only"
                                >
                                    checkbox
                                </label>
                            </div>
                        </th>
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="px-6 py-3 cursor-pointer w-2/6"
                                onClick={() => handleSort(column)}
                            >
                                <div className="flex items-center">
                                    <span className="ml-1">{column}</span>
                                    {sortColumn === column && (
                                        <span className="ml-1">
                                            {sortOrder === 'asc' ? (
                                                <svg
                                                    className="w-4 h-4 text-gray-400 inline-block"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-4 h-4 text-gray-400 inline-block"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                                    ></path>
                                                </svg>
                                            )}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                        <th className="px-6 py-3 w-2/12">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row) => (
                        <React.Fragment key={row.id}>
                            <tr
                                className={`${
                                    selectedRow === row.id
                                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-white'
                                        : 'bg-white dark:bg-gray-800'
                                } border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                                onClick={() => handleRowClick(row.id)}
                            >
                                <td className="w-1/12 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${row.id}`}
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedRows.includes(
                                                row.id,
                                            )}
                                            onChange={() =>
                                                handleRowSelection(row.id)
                                            }
                                        />
                                        <label
                                            htmlFor={`checkbox-table-search-${row.id}`}
                                            className="sr-only"
                                        >
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                {columns.map((column) => (
                                    <td
                                        key={column}
                                        className={`${
                                            selectedRow === row.id
                                                ? 'font-bold'
                                                : ''
                                        } px-6 py-4 whitespace-nowrap dark:text-white w-2/6`}
                                    >
                                        {row[column]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 w-2/12">
                                    <a
                                        href="#"
                                        className="font-medium mr-2 text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEditUser(row.id);
                                        }}
                                    >
                                        Edit
                                    </a>
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={(e) => {
                                            handleDelete(row.id, e);
                                        }}
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                            {expandedRows.includes(row.id) && (
                                <tr>
                                    <td
                                        colSpan={columns.length + 2}
                                        className="p-4"
                                    >
                                        {/* User details content */}
                                        {userDetails ? (
                                            <div>
                                                <h3>User Details</h3>
                                                <p>User ID: {userDetails.id}</p>
                                                {/* Add more details based on your data structure */}
                                            </div>
                                        ) : (
                                            <p>Loading user details...</p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {selectedRows.length > 0 && (
                <div className="flex mb-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
                        onClick={handleDeleteSelected}
                    >
                        Delete Selected
                    </button>
                </div>
            )}
            <nav
                className="flex items-center justify-between pt-4"
                aria-label="Table navigation"
            >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {startIndex + 1}-{startIndex + paginatedData.length}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {data.length}
                    </span>
                </span>
                <ul className="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover-bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark-hover-bg-700 dark-hover-text-white"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </a>
                    </li>
                    {Array.from({
                        length: Math.ceil(data.length / itemsPerPage),
                    }).map((_, pageIndex) => (
                        <li key={`page-${pageIndex + 1}`}>
                            <a
                                href="#"
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                                    currentPage === pageIndex + 1
                                        ? 'text-blue-600 bg-blue-50 hover-bg-blue-100 hover-text-blue-700 dark-border-gray-700 dark-bg-gray-700 dark-text-white'
                                        : 'hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-700 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-700 dark-hover-text-white'
                                }`}
                                onClick={() => handlePageChange(pageIndex + 1)}
                            >
                                {pageIndex + 1}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-700 dark-hover-text-white"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={
                                currentPage ===
                                Math.ceil(data.length / itemsPerPage)
                            }
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

DataTable.propTypes = {
    endpoint: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    selectableColumns: PropTypes.arrayOf(PropTypes.string),
};

export default DataTable;
