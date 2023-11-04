import { useState } from 'react';
import {
    askResetPasswordRequest,
    checkResetTokenRequest,
    updatePasswordRequest
} from "@/services/forgotPasswordService";

export function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(null);

    async function askResetPassword(email) {
        setIsLoading(true);
        try {
            await askResetPasswordRequest(email)
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }

    async function checkResetToken(token) {
        setIsLoading(true);
        try {
            const response = await checkResetTokenRequest(token)
            console.log("re", response)
            setIsLoading(false);
            setIsTokenValid(true);
        } catch (err) {
            createToast('error', 'Error recuperation token')
            setIsLoading(false);
            setIsTokenValid(false);
        }
    }

    async function updatePassword(token, newPassword) {
        setIsLoading(true);
        try {
            const response = await updatePasswordRequest(token, newPassword)
            createToast('success', 'Vous avez bien modifié votre password')
            return true
        } catch (err) {
            return  false
        }
    }

    return { askResetPassword, checkResetToken, updatePassword, isLoading, isTokenValid };
}
