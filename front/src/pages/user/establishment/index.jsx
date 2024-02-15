import { useEffect } from 'react';
import { useEstablishment } from '@/hooks/useEstablishment';
import MapComponent from '@/components/Map';
import EstablishmentTable from '@/components/EstablishmentTable';

export default function ListAllEstablishment() {
    const { establishments, getAllEstablishments } = useEstablishment();

    useEffect(() => {
        getAllEstablishments();
    }, [getAllEstablishments]);

    return (
        <div>
            <EstablishmentTable establishments={establishments} />
            <MapComponent />
        </div>
    );
}
