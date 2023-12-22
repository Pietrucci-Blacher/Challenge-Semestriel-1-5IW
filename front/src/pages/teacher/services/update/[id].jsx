import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";
import { Button as FlowbiteButton } from "flowbite-react";
import Link from "next/link";
import { useService } from "@/hooks/useService";
import TextArea from "@/components/TextArea";
import SelectMenu from "@/components/SelectMenu";
import { updateServiceRequest } from "@/services/serviceService";
import { useEstablishment } from "@/hooks/useEstablishment";

export default function UpdateService() {
  const { createToastMessage } = useToast();
  const router = useRouter();
  const { id } = router.query;
  const { service, getService } = useService();
  const { establishments, getMyEstablishments } = useEstablishment();

  useEffect(() => {
    getService(id);
    getMyEstablishments();
  }, [id]);

  useEffect(() => {
    setFormData({
      title: service?.title || "",
      description: service?.description || "",
      body: service?.body || "",
      price: service?.price || 0,
      establishment_id: service?.establishment_id || "",
    });
  }, [service]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    establishment_id: 0,
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

  const handleSelectChangeEtablishment = (selectedValue) => {
    setFormData({
      ...formData,
      establishment_id: parseInt(selectedValue) || null,
    });
  };

  const handleInputPriceChange = (value) => {
    setFormData({ ...formData, price: parseInt(value) });
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const { title, description, price, establishment_id, body } = formData;

    if (!title || !description || !price || !establishment_id || !body) {
      createToastMessage("error", "Veuillez remplir tous les champs");
      return;
    }

    try {
      const services = await updateServiceRequest(id, {
        title,
        description,
        price,
        establishment_id,
        body,
      });

      if (!services) {
        createToastMessage("error", "Une erreur est survenue");
        return;
      }

      await router.push(`/teacher/services/${services.id}`);
    } catch (error) {
      createToastMessage("error", error);
    }
  };
  return (
    <div>
      <h1>Update</h1>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={handleSubmitUpdate}
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
            options={
              establishments
                ? establishments.map((establishment) => ({
                    label: establishment.name,
                    value: establishment.id,
                  }))
                : []
            }
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
        <GenericButton label="Modifier un etablisement" />
      </form>
      <FlowbiteButton
        className="my-2"
        as={Link}
        href={`/teacher/establishment/${id}`}
      >
        Retour
      </FlowbiteButton>
    </div>
  );
}
