import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleInputEmailChange = (value) => {
        setEmail(value);
    }

    const handleInputPasswordChange = (value) => {
        setPassword(value);
    }
    return (
        <>
            <h2>
                Register
                <br />
                <br />
                <br />

                <Link href="/auth/login">Login</Link>
                <Input label="Password" type="Password" placeholder="Password" onChange={handleInputPasswordChange} value={password} />
                <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange} value={email} />
                <Button></Button>

            </h2>
        </>
    )
}