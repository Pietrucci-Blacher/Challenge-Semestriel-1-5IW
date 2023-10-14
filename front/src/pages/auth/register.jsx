import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })
    const { firstname, lastname, email, password } = formData;
    const {handleRegister} = useAuth();

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

    const onRegister = () => {
        console.log("register", formData)
        handleRegister(formData);
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
                
                <br />
                <Input label="firstname" type="firstname" placeholder="firstname" onChange={handleInputFirstnameChange} value={firstname} />
                <Input label="lastname" type="lastname" placeholder="lastname" onChange={handleInputLastnameChange} value={lastname} />
                <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange} value={email} />
                <Input label="Password" type="Password" placeholder="Password" onChange={handleInputPasswordChange} value={password} />
                <Button label="S'inscrire" onClick={onRegister}/>

            </h2>
        </>
    )
}