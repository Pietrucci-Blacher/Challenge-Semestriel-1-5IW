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

    const protectedRoutes = ['/user', '/teacher', '/provider', '/admin'];
    const noHeaderRoutes = ['/auth/login', '/auth/register'];

    const canAccessRoute = () => {
        const path = router.pathname;
        if (
            !protectedRoutes.some((protectedRoute) =>
                path.startsWith(protectedRoute),
            )
        ) {
            return true; // Route publique, pas besoin de vérification
        }

        // Vérification des rôles pour l'accès aux routes protégées
        const roles = user?.roles.map((role) => role.toLowerCase()) || [];
        return (
            (path.startsWith('/admin') && roles.includes('role_admin')) ||
            (path.startsWith('/provider') && roles.includes('role_provider')) ||
            (path.startsWith('/teacher') && roles.includes('role_teacher')) ||
            (path.startsWith('/user') && roles.includes('role_user'))
        );
    };

    useEffect(() => {
        if (isLoading) return; // Attendre la fin du chargement pour décider
        const path = router.pathname;

        if (
            !isLogged &&
            protectedRoutes.some((protectedRoute) =>
                path.startsWith(protectedRoute),
            )
        ) {
            router.push('/auth/login');
            return;
        }

        if (isLogged && !canAccessRoute()) {
            router.push('/404'); // ou '/403' pour Accès Refusé
        }
    }, [isLoading, isLogged, router]);

    if (isLoading) {
        // Afficher le spinner uniquement sur les routes protégées pendant le chargement
        const path = router.pathname;
        if (
            protectedRoutes.some((protectedRoute) =>
                path.startsWith(protectedRoute),
            )
        ) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner
                        aria-label="Extra large spinner example"
                        size="xl"
                    />
                </div>
            );
        }
    }

    // Sélection du layout en fonction du rôle de l'utilisateur
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

    // Contenu principal
    return (
        <Flowbite>
            <div className="grid grid-rows-[auto,1fr] h-screen dark:bg-gray-900">
                {!noHeaderRoutes.includes(router.pathname) && <Header />}
                <div className="flex flex-row h-screen">
                    <Layout>{children}</Layout>
                </div>
            </div>
        </Flowbite>
    );
};

export default ChooseLayout;
