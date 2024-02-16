import { FileInput, Label, TextInput } from 'flowbite-react';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import GenericButton from '@/components/GenericButton';
import useRequestsProvider from '@/hooks/useRequestsProvider';
import { useToast } from '@/hooks/useToast';
import { useAuthContext } from '@/providers/AuthProvider';

export default function ApplyToBeProvider() {
    const { user } = useAuthContext();
    const { request, getUserRequest, applyToBeProvider, isLoading } =
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
            await applyToBeProvider(formData);
            createToastMessage('success', 'votre demande a bien été envoyé');
        } catch (e) {
            createToastMessage('error', e.detail);
        }
    };

    return (
        <>
            {request !== null && request['hydra:totalItems'] === 0 ? (
                <div className="mt-8">
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

                        <div className="max-w-md mb-4">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="dropzone-file"
                                    value="Upload file"
                                />
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <Label
                                    htmlFor="dropzone-file"
                                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{' '}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Pdf de taille maximun 1MB
                                        </p>
                                    </div>
                                    <FileInput
                                        id="dropzone-file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="application/pdf"
                                        required
                                    />
                                </Label>
                            </div>
                        </div>
                        <GenericButton
                            label="Soumettre la demande"
                            isLoading={isLoading}
                        />
                    </form>
                </div>
            ) : request !== null && request['hydra:totalItems'] > 0 ? (
                <div className="mt-8">
                    <h2>Vous avez déjà fait votre demande</h2>
                    <div>
                        Le statut de votre demande est:{' '}
                        {request['hydra:member'][0]['status']}
                    </div>
                </div>
            ) : (
                <>
                    <h2>En cours de chargement</h2>
                </>
            )}
        </>
    );
}
