import Sidebar from '@/components/Sidebar';
import {
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from 'react-icons/hi';
import { useAuthContext } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';

const UserLayout = ({ children }) => {
    const { user } = useAuthContext();
    const [path, setPath] = useState('');

    useEffect(() => {
        if (!user) return;
        if (user.roles.includes('ROLE_ADMIN')) setPath('/admin');
        else if (user.roles.includes('ROLE_PROVIDER')) setPath('/provider');
        else setPath('/profile');
    }, [user]);

    const sidebarContent = [
        {
            icon: HiChartPie,
            text: 'Dashboard',
            href: path,
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiViewBoards,
            text: 'Requests',
            href: '#',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiInbox,
            text: 'Establishment',
            href: '#',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiShoppingBag,
            text: 'Services',
            href: '/services',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiShoppingBag,
            text: 'Reservations',
            href: '/reservations',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiUser,
            text: 'Users',
            href: '#',
            label: '',
            labelColor: 'gray',
        },
        {
            icon: HiTable,
            text: 'Reviews',
            href: '#',
            label: '',
            labelColor: 'gray',
        },
    ];
    return (
        <>
            <Sidebar content={sidebarContent} />
            <main className="p-6 flex-grow w-full">{children}</main>
        </>
    );
};
export default UserLayout;
