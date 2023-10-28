import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {useResetPassword} from "@/hooks/useResetPassword";
import PasswordResetForm from "@/components/PasswordResetForm";
import createToast from "@/services/toast";

export default function UpdatePassword() {
    const router = useRouter();
    const {token} = router.query;

    const {isTokenValid, isLoading, checkResetToken, updatePassword} = useResetPassword()

    useEffect(() => {
        if (token) {
            checkResetToken(token)
        }
    }, [token]);

    useEffect(() => {
        if (isTokenValid === false) router.push('/')
    }, [isTokenValid]);

    const handlePasswordReset = async (newPassword) => {
        const result = await updatePassword(token, newPassword)
        if (result === false){
            createToast('error', 'error durant la mise a jour de votre password')
        }
        if (result === true){
            await router.push('/auth/login')
        }
    }


    return (
        <div>
            {token}
            {isTokenValid === true ? (
                <PasswordResetForm onSubmit={handlePasswordReset}/>
            ) : (
                <div>Vérification du token...</div>
            )}
        </div>
    );
}
