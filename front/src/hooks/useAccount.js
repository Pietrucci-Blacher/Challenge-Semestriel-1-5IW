import { useEffect } from "react";
import useAuth from "./useAuth";

const useAccount = () => {
    const {user, handleMe} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            await handleMe();
        };

        fetchData();
    }, []);
    
    // if(!user) throw new Error("Account is null");
    return {account: user};
}

export default useAccount;
