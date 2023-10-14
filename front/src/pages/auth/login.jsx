import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleInputEmailChange = (value) => {
        setEmail(value);
    }

    const handleInputPasswordChange = (value) => {
        setPassword(value);
    }
    const handleLogin = () => {
        if (email === "" || password === "") {
            alert("Email and password are required");
            return;
        }
        console.log("login", email, password)
    }
    return (
        <>
            <h2>
                login
                <br />
                <br />
                <br />

                <Link href="/auth/register">Register</Link>
                <br />
                <br />
                <Input label="Password" type="Password" placeholder="Password" onChange={handleInputPasswordChange} value={password} />
                <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange} value={email} />

                <Button label="Login" onClick={handleLogin} />
            </h2>
        </>
    )
}