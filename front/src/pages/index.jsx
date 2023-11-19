import Link from "next/link";
import Cookie from "js-cookie";

export default function Index(){

    return (
        <>
        <div>
            home
            <br />
            <Link href="/auth/login">Login</Link>

            
            <br />
            <br />
            <Link href="/auth/register">Register</Link>
        </div>
        </>
    )
}
