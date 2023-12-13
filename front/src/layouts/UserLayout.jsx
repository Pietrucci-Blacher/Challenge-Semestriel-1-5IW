import Sidebar from "@/components/Sidebar";
import {HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards} from "react-icons/hi";

const UserLayout = ({children}) => {
    const sidebarContent = [
        {icon: HiChartPie, text: "Dashboard", href: "#", label: "Pro", labelColor: "gray"},
        {icon: HiViewBoards, text: "Requests", href: "#", label: "Pro", labelColor: "gray"},
        {icon: HiInbox, text: "Establishment", href: "#", label: "Pro", labelColor: "gray"},
        {icon: HiShoppingBag, text: "Services", href: "#", label: "Pro", labelColor: "gray"},
        {icon: HiUser, text: "Users", href: "#", label: "Pro", labelColor: "gray"},
        {icon: HiTable, text: "Reviews", href: "#", label: "Pro", labelColor: "gray"}
    ]
    return (
        <>
            <Sidebar content={sidebarContent}/>
            <main className="p-6 w-full">
                {children}
            </main>
        </>
    )
}
export default UserLayout;
