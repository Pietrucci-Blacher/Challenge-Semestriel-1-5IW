import { useEffect } from 'react';
import { useEstablishment } from '@/hooks/useEstablishment';
import MapComponent from '@/components/Map';
import EstablishmentTable from '@/components/EstablishmentTable';
import { Button as FlowbiteButton } from 'flowbite-react';
import Link from 'next/link';



export default function ListAllEstablishment() {
    const { establishments, getAllEstablishments } = useEstablishment();

    useEffect(() => {
        getAllEstablishments();
    }, [getAllEstablishments]);

    return (
        <div>
            <EstablishmentTable establishments={establishments} />
            <FlowbiteButton
                as={Link}
                href={`/provider/establishment/create`}
            >
                Créer un établissement
            </FlowbiteButton>
            <MapComponent />
        </div>
    );
}
