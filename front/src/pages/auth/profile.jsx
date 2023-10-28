import useAccount from '@/hooks/useAccount';
import Link from "next/link";

export default function Profile() {

    const { account } = useAccount();

    
    return (
        <>
            <div>profile</div>
            <div>
                firstname {account?.firstname}
                <br />
                lastname {account?.lastname}
                <br />
                email {account?.email}
                <br />
                role {account?.roles}
                <br />                
              </div>

            <Link href="/auth/logout">Logout</Link>

        </>
    )
}
