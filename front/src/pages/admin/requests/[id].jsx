import { useRouter } from 'next/router';
import useRequestsProvider from '@/hooks/useRequestsProvider';
import { useEffect } from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';
import Link from 'next/link';
import GenericButton from '@/components/GenericButton';
import { useToast } from '@/hooks/useToast';

export default function Request() {
    const { createToastMessage } = useToast();
    const { request, getRequest, approveRequest, declineRequest } =
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
        } catch (e) {
            createToastMessage(
                'error',
                'Error durant la mise à jour de la demande',
            );
        }
    };

    return (
        <>
            <h2>hello {id}</h2>
            {request ? (
                <div>
                    <div>
                        <h5>Information de la demande</h5>
                        <span>Status: {request?.status}</span>
                    </div>
                    <div>
                        <h5>Information user</h5>
                        <span>
                            Lastname: {request?.createdBy?.lastname}
                        </span>{' '}
                        <br />
                        <span>
                            Firstname: {request?.createdBy?.firstname}
                        </span>{' '}
                        <br />
                        <span>Email: {request?.createdBy?.email}</span>
                    </div>
                    <div>
                        <h5>Information de l&apos;organisme</h5>
                        <span>Numero Kbis: {request?.kbis}</span>
                        <FlowbiteButton
                            as={Link}
                            href={`http://localhost/media/${request?.filePath}`}
                        >
                            Voir le Kbis en format PDF
                        </FlowbiteButton>
                    </div>

                    <div>
                        <GenericButton
                            label="Accepter la demande"
                            onClick={handleApproveRequest}
                        />
                        <br />
                        <GenericButton
                            label="Refuser la demande"
                            onClick={handleDeclineRequest}
                        />
                    </div>
                </div>
            ) : (
                'Chargement'
            )}
        </>
    );
}
