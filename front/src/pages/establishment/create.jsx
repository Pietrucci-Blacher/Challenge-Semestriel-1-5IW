import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function CreateEstablishment() {
    const { createToastMessage } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        street: "",
        city: "",
        zipCode: "",
    });

    const handleInputNameChange = (value) => {
        setFormData({ ...formData, name: value });
    };

    const handleInputStreetChange = (value) => {
        setFormData({ ...formData, street: value });
    };

    const handleInputCityChange = (value) => {
        setFormData({ ...formData, city: value });
    };

    const handleInputZipCodeChange = (value) => {
        setFormData({ ...formData, zipCode: value });
    };

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const { name, street, city, zipCode } = formData;

        if (!name || !street || !city || !zipCode) {
            createToastMessage("error", "Veuillez remplir tous les champs");
            return;
        }

        console.log("submit create", { name, street, city, zipCode });
    };

    return (
        <div>
            <h1>Create</h1>
            <form
                className="flex max-w-md flex-col gap-4"
                onSubmit={handleSubmitCreate}
            >
                <div>
                    <Input
                        label="Nom"
                        type="text"
                        placeholder="Entrer un nom"
                        value={formData.name}
                        onChange={handleInputNameChange}
                    />
                </div>
                <div>
                    <Input
                        label="Rue"
                        type="text"
                        placeholder="Entrer une rue"
                        value={formData.street}
                        onChange={handleInputStreetChange}
                    />
                </div>
                <div>
                    <Input
                        label="Ville"
                        type="text"
                        placeholder="Entrer une ville"
                        value={formData.city}
                        onChange={handleInputCityChange}
                    />
                </div>
                <div>
                    <Input
                        label="Code postal"
                        type="text"
                        placeholder="Entrer un code postal"
                        value={formData.zipCode}
                        onChange={handleInputZipCodeChange}
                    />
                </div>
                <GenericButton label="Creer un etablisement" />
            </form>
        </div>
    );
}
