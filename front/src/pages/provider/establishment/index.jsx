import { useEstablishment } from '@/hooks/useEstablishment';
import MapComponent from '@/components/Map';
import EstablishmentTable from '@/components/EstablishmentTable';
import { useContext, useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';
import { useAuthContext } from '@/providers/AuthProvider';

export default function ListAllEstablishment() {
    const { establishments, getAllEstablishments } = useEstablishment();

    useEffect(() => {
        getAllEstablishments();
    }, [getAllEstablishments]);

    return (
        <div>
            <EstablishmentTable establishments={establishments} />
            <FlowbiteButton
                className="my-2"
                as={Link}
                href="/provider/establishment/create"
            >
                Créer un établissement
            </FlowbiteButton>
            <MapComponent />
        </div>
    );
}
