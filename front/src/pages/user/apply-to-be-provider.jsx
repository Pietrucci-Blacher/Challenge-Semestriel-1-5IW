import { FileInput, Label, TextInput } from 'flowbite-react';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import GenericButton from '@/components/GenericButton';
import useRequestsProvider from '@/hooks/useRequestsProvider';
import { useToast } from '@/hooks/useToast';
import { useAuthContext } from '@/providers/AuthProvider';

export default function ApplyToBeProvider() {
    const { user } = useAuthContext();
    const { request, getUserRequest, applyToBeProvider } =
        useRequestsProvider();
    const { createToastMessage } = useToast();
    const [kbis, setKbis] = useState('');
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };
    useEffect(() => {
        const id = user?.id;
        if (!id) return;
        getUserRequest(id);
    }, [user]);
    useEffect(() => {}, [request]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('kbis', kbis);
        formData.append('file', file);
        try {
            const response = await applyToBeProvider(formData);
            createToastMessage('success', 'votre demande a bien été envoyé');
        } catch (e) {
            createToastMessage('error', e.detail);
        }
    };

    return (
        <>
            {request !== null && request['hydra:totalItems'] === 0 ? (
                <>
                    <h2>Postuler pour devenir prestataire.</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="kbis"
                                    value="Votre numero de kbis"
                                />
                            </div>
                            <TextInput
                                label="Votre Kbis"
                                id="kbis"
                                required
                                type="text"
                                name="kbis"
                                value={kbis}
                                onChange={(e) => setKbis(e.target.value)}
                            />
                        </div>

                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Upload file" />
                            </div>
                            <FileInput
                                id="file"
                                helperText="Envoyer votre Kbis en pdf"
                                onChange={handleFileChange}
                            />
                        </div>
                        <GenericButton label="soumettre la demande" />
                    </form>
                </>
            ) : request !== null && request['hydra:totalItems'] > 0 ? (
                <>
                    <h2>Vous avez déjà fait votre demande</h2>
                    <div>
                        Le statut de votre demande est:{' '}
                        {request['hydra:member'][0]['status']}
                    </div>
                </>
            ) : (
                <>
                    <h2>En cours de chargement</h2>
                </>
            )}
        </>
    );
}
