import Sidebar from '@/components/Sidebar';
import { HiChartPie, HiInbox, HiShoppingBag, HiTable } from 'react-icons/hi';

const sidebarContent = [
    {
        icon: HiInbox,
        text: 'Establishment',
        href: '/teacher/',
        label: '',
        labelColor: 'gray',
    },
    {
        icon: HiShoppingBag,
        text: 'Services',
        href: '/teacher/',
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
    {
        icon: HiTable,
        text: 'Planning',
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
