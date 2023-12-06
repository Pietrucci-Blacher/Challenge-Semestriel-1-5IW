import Link from "next/link";
import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import {useState} from "react";
import {useAuthContext} from "@/providers/AuthProvider";
import {useAuth} from "@/hooks/useAuth";
import {useToast} from "@/hooks/useToast";

export default function Register() {
    const {login, logout, register} = useAuth();
    const {createToastMessage} = useToast();

    const [formData, setFormData] = useState({
        firstname: "email@email.com",
        lastname: "email@email.com",
        email: "email@email.com",
        password: "email@email.com",
    })
    const {firstname, lastname, email, password} = formData;

    const handleInputEmailChange = (value) => {
        setFormData({...formData, email: value})
    }

    const handleInputPasswordChange = (value) => {
        setFormData({...formData, password: value})
    }

    const handleInputFirstnameChange = (value) => {
        setFormData({...formData, firstname: value})
    }

    const handleInputLastnameChange = (value) => {
        setFormData({...formData, lastname: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await register(formData);
            createToastMessage("success", "Votre compte a bien été crée");
        } catch (error) {
            console.log(error)
            if (error.status !== 500) {
                createToastMessage("error", error.detail);
            } else {
                createToastMessage("error", "Un compte avec cette adresse email existe déja");
            }
        }
    }
    return (
        <>
            <h2>
                Register
                <br/>
                <br/>
                <br/>
                <div>
                    <p>Firstname: {formData.firstname}</p>
                    <p>Lastname: {formData.lastname}</p>
                    <p>Email: {formData.email}</p>
                    <p>Password: {formData.password}</p>
                </div>


                <Link href="/auth/login">Login</Link>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input label="firstname" type="firstname" placeholder="firstname"
                               onChange={handleInputFirstnameChange} value={firstname}/>
                        <Input label="lastname" type="lastname" placeholder="lastname"
                               onChange={handleInputLastnameChange} value={lastname}/>
                        <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange}
                               value={email}/>
                        <Input label="Password" type="Password" placeholder="Password"
                               onChange={handleInputPasswordChange} value={password}/>
                    </div>

                    <GenericButton label="S'inscrire"/>

                </form>
                <br/>


            </h2>
        </>
    )
}