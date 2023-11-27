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
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    Inscription
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Inscrivez-vous pour proposer/rechercher des cours à domicile !
                    </p>
                
                <form
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    onSubmit={handleSubmit}>
                    <p className="text-center text-lg font-medium">Créer votre compte</p>
                    <div className="relative">
                        <Input label="firstname" type="firstname" placeholder="Entrer votre prénom" 
                        onChange={handleInputFirstnameChange} value={formData.firstname}  />
                    </div>
                    <div className="relative">
                        <Input label="lastname" type="lastname" placeholder="Entrer votre nom" 
                        onChange={handleInputLastnameChange} value={formData.lastname} />
                    </div>
                    <div className="relative">
                        <Input label="Email" type="email" placeholder="Entrer votre email" 
                        onChange={handleInputEmailChange} value={formData.email} />                  </div>
                    <div className="relative">
                        <Input label="Password" type="Password" placeholder="Password"
                        onChange={handleInputPasswordChange} value={password}/>
                    </div>
                    <GenericButton label="Inscription" />
                        <p className="text-center text-sm text-gray-500">
                        Vous posedez déjà un compte ?
                            <Link href="/auth/login" className="underline">Connexion</Link>
                        </p>
                </form>
                </div>
            </div>
                {/* <Link href="/auth/login">Login</Link>
                
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
                </form> */}
                <br/>
            
        </>
    )
}