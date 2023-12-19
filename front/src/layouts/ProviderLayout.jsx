import Sidebar from '@/components/Sidebar';
import {
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
} from 'react-icons/hi';

const sidebarContent = [
    {
        icon: HiChartPie,
        text: 'Dashboard',
        href: '#',
        label: 'Pro',
        labelColor: 'gray',
    },
    {
        icon: HiInbox,
        text: 'My Establishment',
        href: '/provider/establishment',
        label: 'Pro',
        labelColor: 'gray',
    },
    {
        icon: HiShoppingBag,
        text: 'My Services',
        href: '/provider/services',
        label: 'Pro',
        labelColor: 'gray',
    },
    {
        icon: HiTable,
        text: 'My Reviews',
        href: '#',
        label: 'Pro',
        labelColor: 'gray',
    },
    {
        icon: HiUser,
        text: 'My Teams',
        href: '/provider/establishment/team',
        label: 'Pro',
        labelColor: 'gray',
    },
];
const ProviderLayout = ({ children }) => {
    return (
        <>
            <Sidebar content={sidebarContent} />
            <main className="p-6 flex-grow  w-full">{children}</main>
        </>
    );
};
export default ProviderLayout;
