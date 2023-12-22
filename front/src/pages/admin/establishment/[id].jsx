import { useRouter } from "next/router";
import { useEstablishment } from "@/hooks/useEstablishment";
import { useEffect } from "react";
import { Button as FlowbiteButton } from "flowbite-react";
import Link from "next/link";
import GenericButton from "@/components/GenericButton";
import { deleteEstablishment } from "@/services/establishmentService";
import { useToast } from "@/hooks/useToast";

export default function ShowEstablishment() {
  const router = useRouter();
  const { id } = router.query;
  const { establishment, getEstablishmentById } = useEstablishment();

  useEffect(() => {
    getEstablishmentById(id);
  }, [id]);

  const handleDelete = async (event) => {
    try {
      await deleteEstablishment(id);
      router.push("/admin/establishment");
    } catch (error) {
      createToastMessage("error", "Une erreur est survenue");
    }
  };

  const renderEstablishment = establishment ? (
    <div>
      <h1>{establishment.name}</h1>
      <p>Rue: {establishment.street}</p>
      <p>Ville: {establishment.city}</p>
      <p>Code postal: {establishment.zipCode}</p>
      <p>
        Propriétaire: {establishment.owner.firstname}{" "}
        {establishment.owner.lastname}
      </p>
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
        href={`/admin/establishment/update/${id}`}
      >
        Modifier
      </FlowbiteButton>
      <FlowbiteButton className="my-2" as={Link} href="/admin/establishment">
        Retour
      </FlowbiteButton>
    </>
  );
}
