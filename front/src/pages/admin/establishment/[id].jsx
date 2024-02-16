import { useRouter } from 'next/router';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useEffect } from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';
import Link from 'next/link';
import GenericButton from '@/components/GenericButton';
import { deleteEstablishment } from '@/services/establishmentService';
import { useToast } from '@/hooks/useToast';

export default function ShowEstablishment() {
    const router = useRouter();
    const { id } = router.query;
    const { establishment, getEstablishmentById } = useEstablishment();
    const { createToastMessage } = useToast();

    useEffect(() => {
        getEstablishmentById(id);
    }, [getEstablishmentById, id]);

    const handleDelete = async (event) => {
        try {
            await deleteEstablishment(id);
            router.push('/admin/establishment');
        } catch (error) {
            createToastMessage('error', 'Une erreur est survenue');
        }
    };

    const renderEstablishment = establishment ? (
        <div >            
            <h2 className="text-lg font-semibold">{establishment.name}</h2>
            <div className="mt-4 space-y-1">
                <p>Rue: {establishment.street}</p>
                <p>Ville: {establishment.city}</p>
                <p>Code postal: {establishment.zipCode}</p>
            </div>
            <img
                alt="Paris street view"
                className="mt-4 h-48 w-full"
                height="200"
                style={{
                    aspectRatio: "600/200",
                    objectFit: "cover",
                }}
                width="600"
                src={establishment.photoEstablishment}

            />
            <p className="mt-4">
                Propriétaire: {establishment.owner.firstname}{' '}
                {establishment.owner.lastname}
            </p>
        </div>
    ) : (
        'Chargement...'
    );

    return (
        <>
            <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
                {renderEstablishment}
                <div className="mt-4 flex gap-4">
                    <GenericButton
                        onClick={handleDelete}
                        className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                        label="Supprimer"
                    />
                    <FlowbiteButton
                        className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                        as={Link}
                        href={`/admin/establishment/update/${id}`}
                    >
                        Modifier
                    </FlowbiteButton>
                    <FlowbiteButton
                        className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                        as={Link}
                        href="/admin/establishment"
                    >
                        Retour
                    </FlowbiteButton>
                </div>
            </div>
        </>
    );
}
