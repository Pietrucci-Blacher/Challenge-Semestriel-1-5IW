import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/providers/AuthProvider';
import AdminLayout from '@/layouts/AdminLayout';
import UserLayout from '@/layouts/UserLayout';
import TeacherLayout from '@/layouts/TeacherLayout';
import ProviderLayout from '@/layouts/ProviderLayout';
import DefaultLayout from '@/layouts/DefaultLayout';
import Header from '@/components/Header';
import { Flowbite, Spinner } from 'flowbite-react';

const ChooseLayout = ({ children }) => {
    const { user, isLogged, isLoading } = useAuthContext();
    const router = useRouter();

    const canAccessRoute = () => {
        const path = router.pathname;
        const roles = user?.roles.map((role) => role.toLowerCase()) || [];

        if (path.startsWith('/admin') && !roles.includes('role_admin')) {
            return false;
        } else if (
            path.startsWith('/provider') &&
            !roles.includes('role_provider')
        ) {
            return false;
        } else if (
            path.startsWith('/teacher') &&
            !roles.includes('role_teacher')
        ) {
            return false;
        } else if (path.startsWith('/user') && !roles.includes('role_user')) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (isLoading) return;
        const needsAuth =
            router.pathname !== '/' && !router.pathname.startsWith('/auth');

        if (!isLogged && needsAuth) {
            router.push('/auth/login');
            return;
        }

        if (isLogged && !canAccessRoute()) {
            router.push('/404'); // ou '/403' pour Accès Refusé
            return;
        }
    }, [isLoading, isLogged, router, user]);

    let Layout = DefaultLayout;
    if (user && !isLoading) {
        const roles = user.roles.map((role) => role.toLowerCase());
        if (roles.includes('role_admin')) {
            Layout = AdminLayout;
        } else if (roles.includes('role_provider')) {
            Layout = ProviderLayout;
        } else if (roles.includes('role_teacher')) {
            Layout = TeacherLayout;
        } else if (roles.includes('role_user')) {
            Layout = UserLayout;
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        );
    }

    return (
        <Flowbite>
            <div className="grid grid-rows-[auto,1fr] h-screen dark:bg-gray-900">
                {isLogged ? (
                    <>
                        <Header />
                        <div className="flex flex-row h-screen">
                            <Layout>{children}</Layout>
                        </div>
                    </>
                ) : (
                    <Spinner
                        aria-label="Extra large spinner example"
                        size="xl"
                    />
                )}
            </div>
        </Flowbite>
    );
};

export default ChooseLayout;
