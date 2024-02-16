import { useRouter } from 'next/router';
import useRequestsProvider from '@/hooks/useRequestsProvider';
import { useEffect } from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';
import Link from 'next/link';
import GenericButton from '@/components/GenericButton';
import { useToast } from '@/hooks/useToast';

export default function Request() {
    const { createToastMessage } = useToast();
    const { request, getRequest, isLoading, approveRequest, declineRequest } =
        useRequestsProvider();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        getRequest({ id });
    }, [getRequest, id]);

    const handleApproveRequest = () => {
        try {
            approveRequest({ id });
            createToastMessage('success', 'La demande a bien été mis à jour');
            router.push('/admin/requests');
        } catch (e) {
            createToastMessage(
                'error',
                'Error durant la mise à jour de la demande',
            );
        }
    };

    const handleDeclineRequest = () => {
        try {
            declineRequest({ id });
            createToastMessage('success', 'La demande a bien été mis à jour');
            router.push('/admin/requests');
        } catch (e) {
            createToastMessage(
                'error',
                'Error durant la mise à jour de la demande',
            );
        }
    };

    return (
        <>
            {request ? (
                <div className="max-w-4xl mx-auto my-8 p-4 shadow-lg">
                    <div className="mb-6">
                        <h5 className="text-xl font-semibold mb-2">
                            Information de la demande pour la Requetes: {id}
                        </h5>
                        <span className="font-cool">
                            Status: {request?.status}
                        </span>
                    </div>
                    <div className="mb-6">
                        <h5 className="text-xl font-semibold mb-2">
                            Information user
                        </h5>
                        <span className="font-cool">
                            Lastname: {request?.createdBy?.lastname}
                        </span>{' '}
                        <br />
                        <span className="font-cool">
                            Firstname: {request?.createdBy?.firstname}
                        </span>{' '}
                        <br />
                        <span className="font-cool">
                            Email: {request?.createdBy?.email}
                        </span>
                    </div>
                    <div className="mb-6">
                        <h5 className="text-xl font-semibold mb-2">
                            Information de l&apos;organisme
                        </h5>
                        <span className="font-cool">
                            Numero Kbis: {request?.kbis}
                        </span>
                    </div>
                    <div className="mb-6">
                        <FlowbiteButton
                            as={Link}
                            href={`http://localhost/media/${request?.filePath}`}
                        >
                            Voir le Kbis en format PDF
                        </FlowbiteButton>
                    </div>
                    <div className="flex gap-4 mb-6">
                        {request?.status === 'pending' && (
                            <>
                                <GenericButton
                                    label="Accepter la demande"
                                    onClick={handleApproveRequest}
                                    isLoading={isLoading}
                                />
                                <br />
                                <GenericButton
                                    label="Refuser la demande"
                                    onClick={handleDeclineRequest}
                                    isLoading={isLoading}
                                />
                            </>
                        )}
                    </div>
                    <div className="mb-6">
                        <FlowbiteButton
                            as={Link}
                            href={`http://localhost/media/${request?.filePath}`}
                        >
                            Voir le Kbis en format PDF
                        </FlowbiteButton>
                    </div>
                </div>
            ) : (
                'Chargement'
            )}
        </>
    );
}
