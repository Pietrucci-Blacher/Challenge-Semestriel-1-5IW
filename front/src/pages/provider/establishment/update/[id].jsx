import GenericButton from '@/components/GenericButton';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useRouter } from 'next/router';
import { updateEstablishment } from '@/services/establishmentService';
import { Button as FlowbiteButton } from 'flowbite-react';
import Link from 'next/link';

export default function UpdateEstablishment() {
    const { createToastMessage } = useToast();
    const router = useRouter();
    const { id } = router.query;
    const { establishment, getEstablishmentById } = useEstablishment();

    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        zipCode: '',
        photoEstablishment: null,
    });

    useEffect(() => {
        getEstablishmentById(id);
    }, [getEstablishmentById, id]);

    useEffect(() => {
        setFormData({
            name: establishment?.name || '',
            street: establishment?.street || '',
            city: establishment?.city || '',
            zipCode: establishment?.zipCode || '',
            photoEstablishment: establishment?.photoEstablishment || '',
        });
    }, [establishment]);

    const handleInputNameChange = (value) => {
        setFormData({ ...formData, name: value });
    };

    const handleInputStreetChange = (value) => {
        setFormData({ ...formData, street: value });
    };

    const handleInputCityChange = (value) => {
        setFormData({ ...formData, city: value });
    };

    const handleInputZipCodeChange = (value) => {
        setFormData({ ...formData, zipCode: value });
    };
    
    const handleInputPhotoEstablishmentChange = (file) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const url = event.target.result;
            setFormData({ ...formData, photoEstablishment: url });
        };
        reader.readAsDataURL(file);
    };
    

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        const { name, street, city, zipCode, photoEstablishment } = formData;

        if (!name || !street || !city || !zipCode || !photoEstablishment) {
            createToastMessage('error', 'Veuillez remplir tous les champs');
            return;
        }

        try {
            const establishment = await updateEstablishment(id, {
                name,
                street,
                city,
                zipCode,
                photoEstablishment,
            });

            if (!establishment) {
                createToastMessage('error', 'Une erreur est survenue');
                return;
            }

            router.push(`/provider/establishment/${establishment.id}`);
        } catch (error) {
            createToastMessage('error', error);
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
                        label="Nom"
                        type="text"
                        placeholder="Entrer un nom"
                        value={formData.name}
                        onChange={handleInputNameChange}
                    />
                </div>
                <div>
                    <Input
                        label="Rue"
                        type="text"
                        placeholder="Entrer une rue"
                        value={formData.street}
                        onChange={handleInputStreetChange}
                    />
                </div>
                <div>
                    <Input
                        label="Ville"
                        type="text"
                        placeholder="Entrer une ville"
                        value={formData.city}
                        onChange={handleInputCityChange}
                    />
                </div>
                <div>
                    <Input
                        label="Code postal"
                        type="text"
                        placeholder="Entrer un code postal"
                        value={formData.zipCode}
                        onChange={handleInputZipCodeChange}
                    />
                </div>
                <div>
                    {formData.photoEstablishment && (
                        <img src={formData.photoEstablishment} alt="Photo de l'établissement" style={{ maxWidth: '200px' }} />
                    )}
                    <Input
                        label="Photo de l'établissement"
                        type="text"
                        placeholder="Entrer une photo de l'établissement"
                        value={formData.photoEstablishment}
                        onChange={handleInputPhotoEstablishmentChange}
                    />
                </div>
                {/* <div>
                    <label>Photo de l'établissement</label>
                    <div>
                        {formData.photoEstablishment && (
                            <img src={formData.photoEstablishment} alt="Photo de l'établissement" style={{ maxWidth: '200px' }} />
                        )}
                        <input
                            type="file"
                            onChange={(e) => handleInputPhotoEstablishmentChange(e.target.files[0])}
                        />
                        <console className="log">{formData.photoEstablishment}</console>
                    </div>
                </div> */}
                <GenericButton label="Modifier un etablisement" />
            </form>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href={`/provider/establishment/${id}`}
            >
                Retour
            </FlowbiteButton>
        </div>
    );
}
