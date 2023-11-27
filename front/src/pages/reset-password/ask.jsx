import {useResetPassword} from "@/hooks/useResetPassword";
import {useState} from "react";
import Input from "@/components/Input";
import GenericButton from "@/components/GenericButton";


export default function AskResetPassword() {
    const [email, setEmail] = useState('');
    const { askResetPassword, isLoading, error } = useResetPassword();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await askResetPassword(email);
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Mot de passe oublié ?
                </h1>
                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Rentrer votre nouveau mot de passe
                </p>
            </div>

            <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                onSubmit={handleSubmit}>
                <div>
                    <Input label="Email" type="email" placeholder="Email" onChange={setEmail} value={email} required/>
                </div>
                <GenericButton label="Inscription" />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Envoi en cours...' : 'Réinitialiser le mot de passe'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}