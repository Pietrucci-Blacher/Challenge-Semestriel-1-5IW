import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { useAuthContext} from "@/providers/AuthProvider";
import {useAuth} from "@/hooks/useAuth";
import {useToast} from "@/hooks/useToast";

export default function Register() {
    const { login, logout, register } = useAuth();
    const { createToastMessage } = useToast();

    const [formData, setFormData] = useState({
        firstname: "email@email.com",
        lastname: "email@email.com",
        email: "email@email.com",
        password: "email@email.com",
    })
    const { firstname, lastname, email, password } = formData;

    const handleInputEmailChange = (value) => {
        setFormData({ ...formData, email: value })
    }

    const handleInputPasswordChange = (value) => {
        setFormData({ ...formData, password: value })
    }

    const handleInputFirstnameChange = (value) => {
        setFormData({ ...formData, firstname: value })
    }

    const handleInputLastnameChange = (value) => {
        setFormData({ ...formData, lastname: value })
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        try 
        {
            await register(formData);
        }
        catch (error) {
            createToastMessage("error", error.detail);
        }
    }
    return (
        <>
            <h2>
                Register
                <br />
                <br />
                <br />
                <div>
                    <p>Firstname: {formData.firstname}</p>
                    <p>Lastname: {formData.lastname}</p>
                    <p>Email: {formData.email}</p>
                    <p>Password: {formData.password}</p>
                </div>


                <Link href="/auth/login">Login</Link>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input label="firstname" type="firstname" placeholder="firstname" onChange={handleInputFirstnameChange} value={firstname} />
                        <Input label="lastname" type="lastname" placeholder="lastname" onChange={handleInputLastnameChange} value={lastname} />
                        <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange} value={email} />
                        <Input label="Password" type="Password" placeholder="Password" onChange={handleInputPasswordChange} value={password} />
                    </div>

                    <Button label="S'inscrire"/>

                </form>
                <br />


            </h2>
        </>
    )
}