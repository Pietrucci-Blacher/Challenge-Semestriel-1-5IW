import useAccount from '@/hooks/useAccount';

export default function profile() {

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
        </>
    )
}
