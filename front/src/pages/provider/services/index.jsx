import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";
import useService from "@/hooks/useService";
import dynamic from "next/dynamic";
import TextArea from "@/components/TextArea";

export default function CreateEstablishment() {
    const { createToastMessage } = useToast();
    const { createService } = useService();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        body: "",
        price: 0,
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

    const handleInputPriceChange = (value) => {
        setFormData({ ...formData, price: parseInt(value) });
    };

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const { title, description, body, price } = formData;

        if (!title || !description || !body || !price) {
            createToastMessage("error", "Veuillez remplir tous les champs");
            return;
        }

        try {
            const services = await createService({
                title,
                description,
                body,
                price,
            });

            if (!services) {
                createToastMessage("error", "Une erreur est survenue");
                return;
            }

            await router.push(`/provider/services/${services.id}`);
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
                        onChange={handleInputTitleChange}
                    />
                </div>
                <div>
                    <Input
                        label="Description"
                        type="text"
                        placeholder="Entrer une description"
                        value={formData.description}
                        onChange={handleInputDescriptionChange}
                    />
                </div>
                {/*<div>
                    <TextEditor label={"Corps du Texte"}/>
                </div>*/}
                <div>
                    <TextArea
                        label="Corps du Texte"
                        type="text"
                        placeholder="Entrer un corps de texte"
                        value={formData.body}
                        onChange={handleInputBodyChange}
                    />
                </div>
                <div>
                    <Input
                        label="Prix"
                        type="number"
                        placeholder="Entrer un prix"
                        value={formData.price}
                        min="0"
                        onChange={handleInputPriceChange}
                    />
                </div>
                <div>
                    <GenericButton label="Creer un Service" />
                </div>
            </form>
        </div>
    );
}
