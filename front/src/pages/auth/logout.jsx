import useAccount from '@/hooks/useAccount';
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import {useEffect} from "react";
import {router} from "next/client";

export default function Profile() {


    const {handleLogout} = useAuth()

    useEffect(() => {
        handleLogout()
        router.push('/')
    }, []);

    return (
        <>

            <Link href="/auth/logout">Logout</Link>

        </>
    )
}
