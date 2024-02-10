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
            text: 'Tableau de bord',
            href: '/admin',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiViewBoards,
            text: 'Demandes',
            href: '/admin/requests',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiInbox,
            text: 'Etablissements',
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
            icon: HiTable,
            text: 'Feedbacks',
            href: '/admin/feedback',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiUser,
            text: 'Utilisateurs',
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
