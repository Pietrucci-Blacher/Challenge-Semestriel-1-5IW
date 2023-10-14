import Button from "@/components/Button";
import Input from "@/components/Input";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {isLogged, handleLogin} = useAuth();

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
    return (
        <>
            <h2>
                login
                <br />
                <br />
                <br />

                    {isLogged ? "Logged" : "Not logged"}
                    <br />
                <Link href="/auth/register">Register</Link>
                <br />
                <br />
                <Input label="Password" type="Password" placeholder="Password" onChange={handleInputPasswordChange} value={formData.password} />
                <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange} value={formData.email} />

                <Button label="Login" onClick={onLogin} />
            </h2>
        </>
    )
}