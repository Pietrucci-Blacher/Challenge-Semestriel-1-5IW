import { useEstablishment } from "@/hooks/useEstablishment";
import { useEffect } from "react";
import { Button as FlowbiteButton, Table } from "flowbite-react";
import Link from "next/link";

export default function ListEstablishment() {
  const { establishments, getMyEstablishments } = useEstablishment();

  useEffect(() => {
    getMyEstablishments();
  }, []);

  const renderEstablishments = establishments
    ? establishments.map((establishment) => (
        <Table.Row key={establishment.id}>
          <Table.Cell>{establishment.name}</Table.Cell>
          <Table.Cell>{establishment.street}</Table.Cell>
          <Table.Cell>{establishment.city}</Table.Cell>
          <Table.Cell>{establishment.zipCode}</Table.Cell>
          <Table.Cell>{establishment.teamMembers.length}</Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href={`/provider/establishment/${establishment.id}`}
            >
              Voir
            </a>
          </Table.Cell>
        </Table.Row>
      ))
    : "Chargement en cours";

  return (
    <>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Rue</Table.HeadCell>
          <Table.HeadCell>Ville</Table.HeadCell>
          <Table.HeadCell>Code postal</Table.HeadCell>
          <Table.HeadCell>Nombre des personnes</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>{renderEstablishments}</Table.Body>
      </Table>
      <FlowbiteButton
        className="my-2"
        as={Link}
        href="/provider/establishment/create"
      >
        Créer un établissement
      </FlowbiteButton>
      <FlowbiteButton
        className="my-2"
        as={Link}
        href="/provider/establishment/create"
      >
        Gerer tes equipes
      </FlowbiteButton>
    </>
  );
}
