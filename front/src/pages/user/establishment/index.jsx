import { useEffect, useState } from 'react';
import { useEstablishment } from '@/hooks/useEstablishment';
import MapComponent from '@/components/Map';
import EstablishmentTable from '@/components/EstablishmentTable';
import Input from '@/components/Input';
import { Button, Card, Modal } from 'flowbite-react';



export default function ListAllEstablishment() {
    const { establishments, getAllEstablishments } = useEstablishment();

    useEffect(() => {
        getAllEstablishments();
    }, [getAllEstablishments]);


    const [formData, setFormData] = useState({
        title: '',
    });

    const handleInputSearchChange = (value) => {
        setFormData({ ...formData, title: value });
    };

    return (
        <div>
            <EstablishmentTable establishments={establishments} />
            <MapComponent />
        </div>
    );
}
