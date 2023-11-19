import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useAuthContext} from "@/providers/AuthProvider";
import {useAuth} from "@/hooks/useAuth";
import {useToast} from "@/hooks/useToast";


export default function Login() {
    const {createToastMessage} = useToast();
    const {user, isLogged} = useAuthContext();
    const {login, logout, register} = useAuth();

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
            createToast("error", "Email and password are required");
            return;
        }
        try {
            await login(formData);
        } catch (error) {
            createToast("error", error.message);
        }
    }

    useEffect(() => {
        const goToProfilePage = async () => {
            if (isLogged === true && user !== null) {
                await router.push("/auth/profile");
            }
        };

        goToProfilePage();
    }, [user, isLogged]);

    return (
        <h2>
            login
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
                <Button label="Login"/>
            </form>

            <br/>
            <Link href="/auth/register">Register</Link>
            <br/>
            <br/>
            <Link href="/reset-password/ask">Forgot Password</Link>
        </h2>
    )
}
