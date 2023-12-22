import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button as FlowbiteButton } from "flowbite-react";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";
import GenericButton from "@/components/GenericButton";
import { useService } from "@/hooks/useService";
import { deleteServiceRequest } from "@/services/serviceService";

export default function ShowService() {
  const router = useRouter();
  const { id } = router.query;
  const { service, getService } = useService();
  const { createToastMessage } = useToast();

  useEffect(() => {
    getService(id);
  }, [id]);

  const handleDelete = async (event) => {
    try {
      await deleteServiceRequest(id);
      await router.push("/teacher/services");
    } catch (error) {
      createToastMessage("error", "Une erreur est survenue");
    }
  };

  const renderEstablishment = service ? (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p>{service.body}</p>
      <p>{service.price}</p>
    </div>
  ) : (
    "Chargement..."
  );

  return (
    <>
      <div>{renderEstablishment}</div>
      <GenericButton onClick={handleDelete} label="Supprimer" />
      <FlowbiteButton
        className="my-2"
        as={Link}
        href={`/teacher/services/update/${id}`}
      >
        Modifier
      </FlowbiteButton>
      <FlowbiteButton className="my-2" as={Link} href="/teacher/services">
        Retour
      </FlowbiteButton>
    </>
  );
}
