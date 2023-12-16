import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";
import { Button as FlowbiteButton, FileInput } from "flowbite-react";
import Link from "next/link";
import TextArea from "@/components/TextArea";
import {useService} from "@/hooks/useService";
import SelectMenu from "@/components/SelectMenu";
import {useEstablishment} from "@/hooks/useEstablishment";

export default function CreateService() {
    const { createToastMessage } = useToast();
    const { createService } = useService();
    const router = useRouter();
    const { establishments, getMyEstablishments } = useEstablishment();
    const [image, setImage] = useState(null);


    useEffect(() => {
        getMyEstablishments();
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        body: "",
        establishment_id: 0,
        price: 0,
    });

    const handleFileChange = (event) => {
        const image = event.target.files[0];
        setImage(image);
    };

    const handleInputTitleChange = (value) => {
        setFormData({ ...formData, title: value });
    };

    const handleInputDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleInputBodyChange = (value) => {
        setFormData({ ...formData, body: value });
    };

    const handleSelectChangeEtablishment = (selectedValue) => {
        setFormData({
            ...formData,
            establishment_id: parseInt(selectedValue) || null
        });
    };

    const handleInputPriceChange = (value) => {
        setFormData({ ...formData, price: parseInt(value) });
    };

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const { title, description, price, establishment_id, body} = formData;

        if (!title || !description || !price || !establishment_id || !body) {
            createToastMessage("error", "Veuillez remplir tous les champs");
            return;
        }

        try {
            const establishment = `/establishments/${establishment_id}`

            const data = new FormData();
            data.append('image', image);
            data.append('title', title);
            data.append('description', description);
            data.append('price', price);
            data.append('establishment', establishment)
            data.append('body', body)

            const services = await createService(data);

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
                    <SelectMenu
                        label="Establishment"
                        options={establishments ? establishments.map((establishment) => ({
                            label: establishment.name,
                            value: establishment.id,
                        })) : []}
                        onChange={handleSelectChangeEtablishment}
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
                    <FileInput id="file" helperText="Envoyer une image" onChange={handleFileChange}/>
                </div>
                <div>
                    <GenericButton label="Creer un Service" />
                </div>
            </form>
            <FlowbiteButton className="my-2" as={Link} href="/provider/services/">
                Retour
            </FlowbiteButton>
        </div>
    );
}

