import { useAuthContext} from "@/providers/AuthProvider";
import {useEffect, useState} from "react";
import Input from "@/components/Input";
import GenericButton from "@/components/GenericButton";
import {Button as FlowbiteButton} from 'flowbite-react';
import PasswordResetForm from "@/components/PasswordResetForm";
import useUserAccount from "@/hooks/useUserAccount";
import Link from "next/link";

export default function Profile() {
    const { user, verifyUser, fetchUser } = useAuthContext();
    const { userProfile, updateProfile } = useUserAccount(user?.id);
    const [formData, setFormData] = useState({ ...userProfile });

    useEffect(() => {
        if (!user) {
            verifyUser();
        } else {
            setFormData({ ...userProfile });
        }
    }, [user, userProfile, verifyUser]);

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
        fetchUser()
    }

    const handlePasswordResetSubmit = async (password) => {
        await updateProfile({password});
    }

    useEffect(() => {
        setFormData({ ...userProfile });
    }, [userProfile]);

    if (!user) {
        return <div>Chargement...</div>;
    }
    return (
        <>
            <Link href="/[locale]/auth/logout">Logout</Link>
            <h2>profile role {user?.roles}</h2>
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
                        <GenericButton label="Update Profile"/>
                    </form>
                    <PasswordResetForm onSubmit={handlePasswordResetSubmit}/>
                </>
            ) : (
                <div>Chargement...</div>
            )}


            {userProfile ? (<>
                    <div> Date de creation d&apos;account :{userProfile.createdAt} </div>
                    {userProfile?.updatedAt ? (<div> {}updatedAt :{userProfile?.updatedAt} </div>) : ''}

                </>
            ) : (
                <div>Chargement</div>
            )}

            <FlowbiteButton as={Link} href="/apply-to-be-provider"  outline gradientDuoTone="cyanToBlue">
                Faire une  demande pour devenir prestataire
            </FlowbiteButton>
        </>
    )

}
