import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => {
    const router = useRouter();
    const isAuthPage =
        router.pathname === '/auth/login' ||
        router.pathname === '/auth/register';
    const containerClass = isAuthPage ? 'w-full' : 'p-6 w-full';

    return <main className={containerClass}>{children}</main>;
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
