import Button from "@/components/Button";
import Input from "@/components/Input";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const router = useRouter();

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
            alert("Email and password are required");
            return;
        }
        await handleLogin(formData);
    }

    useEffect(() => {
        if (isLogged === true) {
            router.push("/auth/profile");
        }
    }
        , [isLogged])
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
                <Link href="/auth/register">Register</Link>
                <br />
                <br />
                <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange} value={formData.email} />
                <Input label="Password" type="Password" placeholder="Password" onChange={handleInputPasswordChange} value={formData.password} />

                <Button label="Login" onClick={onLogin} />
            </h2>
        </>
    )
}