import Link from "next/link";
import { Badge } from "flowbite-react";
import DataTable from "@/components/DataTable";

export default function Index() {
    return (
        <div>
            <Badge color="info">Hello</Badge>

            <br/>
            <Link href="/auth/login">Login</Link>

            <br/>
            <br/>
            <Link href="/auth/register">Register</Link>

            <DataTable
                endpoint={'https://localhost/users/'}
                title="Users table"
                itemsPerPage={10}
            />
        </div>
    );
}
