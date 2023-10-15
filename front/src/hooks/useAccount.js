import useAuth from "./useAuth";

const useAccount = () => {
    const {account} = useAuth();
    if(!account) throw new Error("Account is null");
    return account;
}

export default useAccount;
