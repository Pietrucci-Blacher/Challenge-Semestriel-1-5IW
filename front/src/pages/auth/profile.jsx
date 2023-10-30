import { useAuthContext} from "@/providers/AuthProvider";
import {useEffect, useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import PasswordResetForm from "@/components/PasswordResetForm";
import useUserAccount from "@/hooks/useUserAccount";
import Link from "next/link";

export default function Profile() {
    const { user, isLogged } = useAuthContext();
    const { userProfile, updateProfile, loading } = useUserAccount(user.id);
    const [formData, setFormData] = useState({ ...userProfile });

    const handleFirstNameChange = (value) => {
        setFormData({...formData, firstname: value})
    }
    const handleLastNameChange = (value) => {
        setFormData({...formData, lastname: value})
    }
    const handleEmailChange = (value) => {
        setFormData({...formData, email: value})
    }

    const handleProfileUpdateSubmit = async (event) => {
        event.preventDefault()
        await updateProfile(formData);
    }

    const handlePasswordResetSubmit = async (password) => {
        await updateProfile({password});
    }

    useEffect(() => {
        setFormData({ ...userProfile });
    }, [userProfile]);

    // TODO
    // Add history for payments etc...


    return (
        <>
            <Link href="/auth/logout">Logout</Link>
            <div>profile role {user?.roles}</div>
            {user ? (
                <>
                    <form onSubmit={handleProfileUpdateSubmit}>
                        <div>
                            <Input label="firstname" type="text" placeholder="firstname"
                                   onChange={handleFirstNameChange} value={formData.firstname}/>
                            <Input label="lastname" type="text" placeholder="lastname"
                                   onChange={handleLastNameChange}
                                   value={formData.lastname}/>
                            <Input label="Email" type="email" placeholder="Email" onChange={handleEmailChange}
                                   value={formData.email}/>
                        </div>
                        <Button label="Update Profile"/>
                    </form>
                    <PasswordResetForm onSubmit={handlePasswordResetSubmit}/>
                </>
            ) : (
                <div>Chargement...</div>
            )}


            {userProfile ? (<>
                    <div> Date de creation d'account :{userProfile.createdAt} </div>
                    {userProfile?.updatedAt ? (<div> {}updatedAt :{userProfile?.updatedAt} </div>) : ''}

                </>
            ) : (
                <div>Chargement</div>
            )}
        </>
    )

}
