import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ConfirmEmail() {
    const router = useRouter();
    const { token } = router.query;
    const { confirmEmail, isConfirmed  } = useAuth();

    useEffect(() => {
        if (!token) return;
        confirmEmail(token);
    }, [token, confirmEmail]);

    let message = 'Confirming your email ...';

    if (isConfirmed) {
        message = 'Email confirmed! Redirecting ...';
        setTimeout(() =>  router.push('/'), 3000);
    } if (isConfirmed === false) {
        message = 'Email confirmation failed! Redirecting ...';
        setTimeout(() => router.push('/'), 3000);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">{message}</h1>
        </div>
    );
}
