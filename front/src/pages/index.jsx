import Link from "next/link";
import { Badge } from "flowbite-react";
import DataTable from "@/components/DataTable";

export default function Index() {
    return (
        <div>
            <br/>
            <Link href="/auth/login">Login</Link>

            <br/>
            <br/>
            <Link href="/auth/register">Register</Link>

            <DataTable
                endpoint={'https://localhost/users/'}
                title="Users table"
                itemsPerPage={10}
                selectableColumns={['id', 'firstname', 'lastname', 'email', 'roles']}
            />
        </div>
    );
}
