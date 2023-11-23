import Sidebar from "@/components/Sidebar";
import {HiChartPie, HiInbox, HiShoppingBag, HiTable} from "react-icons/hi";

const sidebarContent = [
    {icon: HiChartPie, text: "Dashboard", href: "#", label: "Pro", labelColor: "gray"},
    {icon: HiInbox, text: "My Establishment", href: "#", label: "Pro", labelColor: "gray"},
    {icon: HiShoppingBag, text: "My Services", href: "/services", label: "Pro", labelColor: "gray"},
    {icon: HiTable, text: "My Reviews", href: "#", label: "Pro", labelColor: "gray"}
]
const ProviderLayout = ({children}) => {
    return (
        <>
            <Sidebar content={sidebarContent}/>
            <main>
                {children}
            </main>
        </>
    )
}
export default ProviderLayout;
