import { useEstablishment } from "@/hooks/useEstablishment";
import { useEffect } from "react";
import { Button as FlowbiteButton } from "flowbite-react";
import Link from "next/link";

export default function ListEstablishment() {
    const { establishments, getMyEstablishments } = useEstablishment();

    useEffect(() => {
        getMyEstablishments();
    }, []);

    const renderEstablishments = establishments
        ? establishments.map((establishment) => (
              <tr key={establishment.id}>
                  <td>{establishment.name}</td>
                  <td>{establishment.street}</td>
                  <td>{establishment.city}</td>
                  <td>{establishment.zipCode}</td>
                  <td>
                      <FlowbiteButton
                          as={Link}
                          href={`/provider/establishment/${establishment.id}`}
                      >
                          Voir
                      </FlowbiteButton>
                  </td>
              </tr>
          ))
        : "Chargement en cours";

    return (
        <>
            <h2>ListEstablishment</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Rue</th>
                        <th>Ville</th>
                        <th>Code postal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{renderEstablishments}</tbody>
            </table>
            <FlowbiteButton as={Link} href="/provider/establishment/create">
                Créer un établissement
            </FlowbiteButton>
        </>
    );
}
