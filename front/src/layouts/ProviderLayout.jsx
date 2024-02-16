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
        href: '/provider',
        label: '',
        labelColor: 'gray',
    },
    {
        icon: HiInbox,
        text: 'Establishment',
        href: '/provider/establishment',
        label: '',
        labelColor: 'gray',
    },
    {
        icon: HiShoppingBag,
        text: 'Services',
        href: '/provider/services',
        label: '',
        labelColor: 'gray',
    }
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
