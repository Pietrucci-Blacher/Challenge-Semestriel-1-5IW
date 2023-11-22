import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useAuthContext} from "@/providers/AuthProvider";
import {useAuth} from "@/hooks/useAuth";
import {useToast} from "@/hooks/useToast";
import { useTranslation } from "next-i18next";


export default function Login() {
    const {createToastMessage} = useToast();
    const {user, isLogged} = useAuthContext();
    const {login} = useAuth();
    const {t, i18n} = useTranslation('loginPage');

    const [formData, setFormData] = useState({
        firstname: "email@email.com",
        lastname: "email@email.com",
        email: "email@email.com",
        password: "email@email.com"
    })
    const router = useRouter();

    const handleInputEmailChange = (value) => {
        setFormData({...formData, email: value})
    }

    const handleInputPasswordChange = (value) => {
        setFormData({...formData, password: value})
    }

    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        const {email, password} = formData;
        if (email === "" || password === "") {
            createToastMessage("error", "Email and password are required");
            return;
        }
        try {
            await login(formData);
        } catch (error) {
            createToastMessage("error", error);
        }
    }

    useEffect(() => {
        const goToProfilePage = async () => {
            if (isLogged === true && user) {
                await router.push("/profile");
            }
        };

        goToProfilePage();
    }, [user, isLogged, router]);

    return (
        <h2>
            {t('login')}
            <br/>
            <br/>
            <br/>

            {isLogged ? "Logged" : "Not logged"}
            <br/>
            <br/>

                <br/>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmitLogin}>
                    <div>
                        <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange}
                               value={formData.email}/>
                    </div>
                    <div>
                        <Input label="Password" type="Password" placeholder="Password"
                               onChange={handleInputPasswordChange} value={formData.password}/>
                    </div>
                    <GenericButton label="Login"/>
                </form>

            <br/>
            <Link href="/auth/register">Register</Link>
            <br/>
            <br/>
            <Link href="/reset-password/ask">Forgot Password</Link>
        </h2>
    )
}
