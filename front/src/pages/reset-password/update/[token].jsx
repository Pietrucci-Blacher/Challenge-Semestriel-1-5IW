import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {useResetPassword} from "@/hooks/useResetPassword";
import PasswordResetForm from "@/components/PasswordResetForm";
import {useToast} from "@/hooks/useToast";

export default function UpdatePassword() {
    console.log("ok")
    const router = useRouter();
    const {token} = router.query;
    const { createToastMessage } = useToast();

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
            createToastMessage('error', 'error durant la mise a jour de votre password')
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
