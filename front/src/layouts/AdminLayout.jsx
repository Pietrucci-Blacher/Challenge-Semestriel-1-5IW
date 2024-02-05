import Sidebar from '@/components/Sidebar';
import {
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from 'react-icons/hi';
import PropTypes from 'prop-types';

const AdminLayout = ({ children }) => {
    const sidebarContent = [
        {
            icon: HiChartPie,
            text: 'Dashboard',
            href: '/admin',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiUser,
            text: 'Profile',
            href: '/profile',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiViewBoards,
            text: 'Requests',
            href: '/admin/requests',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiInbox,
            text: 'Establishment',
            href: '/admin/establishment',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiShoppingBag,
            text: 'Services',
            href: '/admin/services',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiUser,
            text: 'Users',
            href: '/admin/users',
            label: '',
            labelColor: 'gray',
        },
    ];
    return (
        <>
            <Sidebar content={sidebarContent} />
            <main className="flex-grow w-full px-6">{children}</main>
        </>
    );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
