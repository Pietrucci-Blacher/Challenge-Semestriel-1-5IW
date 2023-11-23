import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useEstablishment } from "@/hooks/useEstablishment";
import { useRouter } from "next/router";
import { createEstablishment } from "@/services/establishmentService";
import useService from "@/hooks/useService";

export default function CreateEstablishment() {
    const { createToastMessage } = useToast();
    const { create } = useService();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        body: "",
    });

    const handleInputTitleChange = (value) => {
        setFormData({ ...formData, title: value });
    };

    const handleInputDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleInputBodyChange = (value) => {
        setFormData({ ...formData, body: value });
    };


    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const { name, street, city, zipCode } = formData;

        if (!name || !street || !city || !zipCode) {
            createToastMessage("error", "Veuillez remplir tous les champs");
            return;
        }

        try {
            const establishment = await createEstablishment({
                name,
                street,
                city,
                zipCode,
            });

            if (!establishment) {
                createToastMessage("error", "Une erreur est survenue");
                return;
            }

            await router.push(`/provider/establishment/${establishment.id}`);
        } catch (error) {
            createToastMessage("error", error);
        }
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
                        label="Titre"
                        type="text"
                        placeholder="Entrer un titre"
                        value={formData.title}
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
