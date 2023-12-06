import {useAuthContext} from "@/providers/AuthProvider";
import {useRouter} from "next/router";
import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";
import ProviderLayout from "@/layouts/ProviderLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import Header from "@/components/Header";
import {Flowbite} from "flowbite-react";
import {useEffect, useState} from "react";

const canAccessTo = (path, roles) => {
    const lowerCaseRoles = roles.join(',').toLowerCase() || ""
    if (path.startsWith('/admin')) {
        return lowerCaseRoles.includes('admin');
    } else if (path.startsWith('/provider')) {
        return lowerCaseRoles.includes('provider') || lowerCaseRoles.includes('admin');
    } else if (path.startsWith('/user')) {
        return lowerCaseRoles.includes('user') || lowerCaseRoles.includes('admin') || lowerCaseRoles.includes('provider');
    }
    return true
};

const ChooseLayout = ({children}) => {
    const {user, isLogged} = useAuthContext()
    const router = useRouter()
    const path = router.pathname
    const needsAuth = path.startsWith('/admin') || path.startsWith('/provider') || path.startsWith('/user');
    const [isAccessAllowed, setIsAccessAllowed] = useState(false);

    useEffect(() => {
        if (user === null && needsAuth && !isLogged) {
            router.push('/auth/login');

        } else if (user && needsAuth) {
            const hasAccess = canAccessTo(path, user.roles);
            setIsAccessAllowed(hasAccess);
            if (!hasAccess) {
                router.push('/404');
            }
        }
    }, [user, path, needsAuth, isLogged, router]);

    let Layout;

    if (path.startsWith('/admin')) {
        Layout = AdminLayout
    } else if (path.startsWith('/provider')) {
        Layout = ProviderLayout
    } else if (path.startsWith('/user')) {
        Layout = UserLayout
    } else {
        Layout = DefaultLayout
    }
    if (!needsAuth) {
        return (
            <Flowbite>
                <div className="grid grid-rows-[auto,1fr] h-screen dark:bg-gray-900">
                    <div>
                        <Header/>
                    </div>
                    <div className="flex flex-row">
                        <Layout>
                            {children}
                        </Layout>
                    </div>
                </div>
            </Flowbite>
        );
    }
    return (
        <>
            {(needsAuth && isAccessAllowed) && <Flowbite>
                <div className="grid grid-rows-[auto,1fr] h-screen dark:bg-gray-900">
                    <div>
                        <Header/>
                    </div>
                    <div className="flex flex-row">
                        <Layout>
                            {children}
                        </Layout>
                    </div>
                </div>
            </Flowbite>}
        </>
    )
}
export default ChooseLayout
