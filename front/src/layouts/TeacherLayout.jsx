import Sidebar from '@/components/Sidebar';
import { HiChartPie, HiInbox, HiShoppingBag, HiTable } from 'react-icons/hi';

const sidebarContent = [
    {
        icon: HiInbox,
        text: 'My reservations',
        href: '/teacher/reservation',
        label: '',
        labelColor: 'gray',
    },
    {
        icon: HiTable,
        text: 'My Planning',
        href: '/teacher/planning',
        label: '',
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
