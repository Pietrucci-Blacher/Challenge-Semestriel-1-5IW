import {FileInput, Label} from "flowbite-react";
import Input from "@/components/Input";
import {useState} from "react";
import GenericButton from "@/components/GenericButton";
import httpClient from "@/services/httpClient";
import useRequestsProvider from "@/hooks/useRequestsProvider";
import {useToast} from "@/hooks/useToast";


export default function Apply() {
    const {applyToBeProvider} = useRequestsProvider()
    const {createToastMessage} = useToast()
    const [kbis, setKbis] = useState("")
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Récupérer le premier fichier
        setFile(file); // Mettre à jour l'état avec ce fichier
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('kbis', kbis);
        formData.append('file', file);
        try {
            const response = await applyToBeProvider(formData)
            createToastMessage('success', 'votre demande a bien été envoyé')
        } catch (e) {
            console.log("e", e)
            createToastMessage('error', e.detail)
        }
    }
    return (
        <>
            <h2>
                Postuler pour devenir prestataire.
            </h2>
            <form onSubmit={handleSubmit}>
                <Input label="Votre Kbis" required type="text" name="kbis" value={kbis} onChange={setKbis}/>
                <div id="fileUpload" className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Upload file"/>
                    </div>
                    <FileInput id="file" helperText="Envoyer votre Kbis en pdf" onChange={handleFileChange}/>
                </div>
                <GenericButton label="soumettre la demande"/>
            </form>
        </>
    )
}
