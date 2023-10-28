import Button from "@/components/Button";
import Input from "@/components/Input";
import useAuth from "@/hooks/useAuth";
import createToast from "@/services/toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        firstname: "email@email.com",
        lastname: "email@email.com",
        email: "email@email.com",
        password: "email@email.com"
    })
    const router = useRouter();

    useEffect(() => {
        if (localStorage) {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        }
    }, []);

    const { isLogged, token, refreshToken, handleLogin } = useAuth();

    const handleInputEmailChange = (value) => {
        setFormData({ ...formData, email: value })
    }

    const handleInputPasswordChange = (value) => {
        setFormData({ ...formData, password: value })
    }

    const onLogin = async () => {
        const { email, password } = formData;
        if (email === "" || password === "") {
            createToast("error", "Email and password are required");
            return;
        }
        try {
            await handleLogin(formData);
        }
        catch (error) {
            createToast("error", error.message);
        }
    }

    useEffect(() => {
        const goToProfilePage = async () => {
            if (isLogged) {
                await router.push("/auth/profile");
            }
        };

        goToProfilePage();
    }, [isLogged]);

    return (
        <>
            <h2>
                login
                <br />
                <br />
                <br />

                {isLogged ? "Logged" : "Not logged"}
                <br />
                <br />
                <div >
                    token ::
                    <span style={{ fontSize: '14px' }}>
                        {token}
                    </span>
                </div>
                <br />
                <div>

                    refreshToken ::
                    <span style={{ fontSize: '14px' }}>
                        {refreshToken}
                    </span>
                </div>
                <br />
                <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange} value={formData.email} />
                <Input label="Password" type="Password" placeholder="Password" onChange={handleInputPasswordChange} value={formData.password} />

                <Button label="Login" onClick={onLogin} />
                <br/>
                <Link href="/auth/register">Register</Link>
                <br/>
                <br/>
                <Link href="/reset-password/ask">Forgot Password</Link>
            </h2>
        </>
    )
}