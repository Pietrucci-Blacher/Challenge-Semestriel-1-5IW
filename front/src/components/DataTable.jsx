import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { normalize } from "@/utils/data";

const DataTable = ({ endpoint, title, itemsPerPage }) => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        fetchData(endpoint);
    }, [endpoint]);

    useEffect(() => {
        if (data && data.length > 0) {
            const firstItem = data[0];
            const columns = Object.keys(firstItem);
            setColumns(columns);

            const validSortColumn = sortColumn && columns.includes(sortColumn) ? sortColumn : "id";

            const sorted = [...data].sort((a, b) => {
                const valueA = a[validSortColumn];
                const valueB = b[validSortColumn];

                if (typeof valueA === "string" && typeof valueB === "string") {
                    return valueA.localeCompare(valueB);
                } else if (typeof valueA === "number" && typeof valueB === "number") {
                    return valueA - valueB;
                } else {
                    return 0;
                }
            });

            setSortedData(sorted);
            setSortColumn(validSortColumn);
        }
    }, [data, sortColumn, searchTerm]);

    const fetchData = async (url) => {
        try {
            if (!localStorage.getItem("token")) throw new Error("No token");
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log("Response data:", response.data);

            const normalizedData = normalize(response.data);
            setData(normalizedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error
        }
    };

    const handleSort = (column) => {
        setSortColumn(column);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (searchTerm === "") {
            setSortedData(data);
        } else {
            const filteredData = data.filter((item) =>
                Object.values(item).some((value) => value.toLowerCase().includes(searchTerm))
            );
            setSortedData(filteredData);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = sortedData.slice(startIndex, endIndex);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input
                                id="checkbox-all-search"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="checkbox-all-search" className="sr-only">
                                checkbox
                            </label>
                        </div>
                    </th>
                    {columns.map((column) => (
                        <th scope="col" className="px-6 py-3" key={column}>
                            {column}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {paginatedData.map((row) => (
                    <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={row.id}
                    >
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input
                                    id={`checkbox-table-search-${row.id}`}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor={`checkbox-table-search-${row.id}`} className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </td>
                        {columns.map((column) => (
                            <td
                                className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                                key={column}
                            >
                                {row[column]}
                            </td>
                        ))}
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Edit
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}-{startIndex + paginatedData.length}</span> of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span>
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
                    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, pageIndex) => (
                        <li key={`page-${pageIndex + 1}`}>
                            <a
                                href="#"
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                                    currentPage === pageIndex + 1
                                        ? "text-blue-600 bg-blue-50 hover-bg-blue-100 hover-text-blue-700 dark-border-gray-700 dark-bg-gray-700 dark-text-white"
                                        : "hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-700 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-700 dark-hover-text-white"
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
                            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
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
};

export default DataTable;
