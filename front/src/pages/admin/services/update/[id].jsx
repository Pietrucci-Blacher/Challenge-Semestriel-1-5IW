import GenericButton from '@/components/GenericButton';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/router';
import { Button as FlowbiteButton, FileInput } from 'flowbite-react';
import Link from 'next/link';
import { useService } from '@/hooks/useService';
import TextArea from '@/components/TextArea';
import SelectMenu from '@/components/SelectMenu';
import { updateServiceRequest } from '@/services/serviceService';
import { useEstablishment } from '@/hooks/useEstablishment';
import { getAllEstablishments } from '@/services/establishmentService';
import { useAuthContext } from '@/providers/AuthProvider';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default function UpdateService() {
    const { user } = useAuthContext();
    const { createToastMessage } = useToast();
    const router = useRouter();
    const { id } = router.query;
    const { service, getService } = useService();
    const { establishments, getAllEstablishments } = useEstablishment();
    const [image, setImage] = useState(null);
    const [editorData, setEditorData] = useState(null);
    const [initEditorData, setInitEditorData] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        duration: 0,
    });

    useEffect(() => {
        getService(id);
        getAllEstablishments();
    }, [id, getAllEstablishments, getService]);

    useEffect(() => {
        setFormData({
            title: service?.title || '',
            description: service?.description || '',
            price: service?.price || 0,
            duration: service?.duration || 0,
        });
        setEditorData(service?.body || {});
        setInitEditorData(service?.body || {});
    }, [service]);

    const handleFileChange = (event) => {
        const image = event.target.files[0];
        setImage(image);
    };

    const handleInputTitleChange = (value) => {
        setFormData({ ...formData, title: value });
    };

    const handleInputDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleInputBodyChange = (value) => {
        setEditorData(value);
    };

    const handleInputPriceChange = (value) => {
        setFormData({ ...formData, price: parseInt(value) });
    };

    const handleInputDurationChange = (value) => {
        setFormData({ ...formData, duration: parseInt(value) });
    };

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        const { title, description, price, duration } = formData;

        if (
            !title ||
            !description ||
            !price ||
            !duration ||
            !editorData?.blocks?.length
        ) {
            createToastMessage('error', 'Veuillez remplir tous les champs');
            return;
        }

        try {
            const body = JSON.stringify(editorData);

            const data = new FormData();
            if (image) data.append('image', image);
            data.append('title', title);
            data.append('description', description);
            data.append('price', price);
            data.append('body', body);
            data.append('duration', duration);

            const services = await updateServiceRequest(id, data);

            if (!services) {
                createToastMessage('error', 'Une erreur est survenue');
                return;
            }

            await router.push(`/admin/services/${services.id}`);
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
                        label="Titre"
                        type="text"
                        placeholder="Entrer un titre"
                        value={formData.title}
                        onChange={handleInputTitleChange}
                    />
                </div>
                <div>
                    <Input
                        label="Description"
                        type="text"
                        placeholder="Entrer une description"
                        value={formData.description}
                        onChange={handleInputDescriptionChange}
                    />
                </div>
                <div>
                    <Editor
                        data={initEditorData}
                        onChange={handleInputBodyChange}
                        editorblock="editorjs"
                        label="Corps du Texte"
                    />
                </div>
                <div>
                    <Input
                        label="Prix"
                        type="number"
                        placeholder="Entrer un prix"
                        value={formData.price}
                        min="0"
                        onChange={handleInputPriceChange}
                    />
                </div>
                <div>
                    <Input
                        label="Durée en minutes"
                        type="number"
                        placeholder="Entrer une durée"
                        value={formData.duration}
                        min="0"
                        onChange={handleInputDurationChange}
                    />
                </div>
                <div>
                    <FileInput
                        id="file"
                        helperText="Envoyer une image"
                        onChange={handleFileChange}
                    />
                </div>
                <GenericButton label="Modifier un etablisement" />
            </form>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href={`/admin/services/${id}`}
            >
                Retour
            </FlowbiteButton>
        </div>
    );
}
