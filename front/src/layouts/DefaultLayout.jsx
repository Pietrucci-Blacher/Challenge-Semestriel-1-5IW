import Sidebar from "@/components/Sidebar";

const DefaultLayout = ({children}) => {
    return (
        <>
            <main className="p-6">
                {children}
            </main>
        </>
    )
}

export default DefaultLayout