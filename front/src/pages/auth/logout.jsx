"use client"
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";

export default function Logout() {
    const router = useRouter();
    const {logout} = useAuth()
    useEffect(() => {
        logout()
        router.push('/')
    }, [logout, router]);


}
