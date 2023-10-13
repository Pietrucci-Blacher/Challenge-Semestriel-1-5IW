import Input from "@/components/Input";
import Link from "next/link";

export default function Login() {
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
                <br />
                
                <Input></Input>
            </h2>
        </>
    )
}