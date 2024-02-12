import { useRouter } from 'next/router';
import { useEffect, memo } from 'react';
import { useToast } from '@/hooks/useToast';
import Link from 'next/link';
import GenericButton from '@/components/GenericButton';
import { useService } from '@/hooks/useService';
import { deleteServiceRequest } from '@/services/serviceService';
import { convertDataToHtml } from '@/utils/utils';
import {
    Breadcrumb,
    Button as FlowbiteButton,
    Select,
    Tabs,
} from 'flowbite-react';
import {
    HiStar,
    HiSpeakerphone,
    HiOutlineUpload,
    HiOutlineHeart,
    HiViewGrid,
    HiBadgeCheck,
    HiKey,
    HiOutlineArrowRight,
    HiArrowDown,
    HiUserCircle,
} from 'react-icons/hi';
import { useFeedback } from '@/hooks/useFeedback';
import { Rating } from '@/components/Rating';

export default function ShowService() {
    const router = useRouter();
    const { id } = router.query;
    const { service, getService } = useService();
    const { createToastMessage } = useToast();
    const {
        feedbacks,
        detailed,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
        getFeedbacksFromServiceId,
        getServiceNote,
    } = useFeedback();

    useEffect(() => {
        if(!id) return
        getService(id);
        getFeedbacksFromServiceId(id);
        getServiceNote(id);
    }, [id, getService, getFeedbacksFromServiceId, getServiceNote]);

    const handleDelete = async (event) => {
        try {
            await deleteServiceRequest(id);
            await router.push('/provider/services');
        } catch (error) {
            createToastMessage('error', 'Une erreur est survenue');
        }
    };

    const RatingList = memo(() => (
        <ul className="w-full flex justify-between">
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Qualité du cours', detailed)}
                {Rating('Pédagogie', detailed)}
            </ul>
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Rapport Qualité Prix', detailed)}
                {Rating('Communication', detailed)}
            </ul>
        </ul>
    ));

    RatingList.displayName = 'RatingList';

    const renderService = service ? (
        <>
            <div className="w-full mr-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded my-2">
                    <h1 className="font-medium text-3xl">
                        {service.title}
                        <HiStar className="inline-block mx-1" />
                        {detailed.note}
                    </h1>
                    <p>{service.description}</p>
                    <p>{service.price} €</p>
                    <p>{service.duration} Minutes</p>
                    <p>
                        Propriétaire: {service.author.firstname}{' '}
                        {service.author.lastname}
                    </p>
                </div>
                <div className="editor-html my-2">
                    {convertDataToHtml(service.body.blocks)}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded my-2">
                    <h1 className="font-medium text-3xl">Note détaillée</h1>
                    <RatingList />
                </div>
            </div>
            <img
                className="w-[500px] rounded"
                src={`https://localhost/media/${service.imagePath}`}
                alt="image"
            />
        </>
    ) : (
        'Chargement...'
    );

    return (
        <>
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item title="Description" icon={HiUserCircle} active>
                    <div className="lg:flex justify-between">
                        {renderService}
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Feedback" icon={HiOutlineHeart}>
                    <div className="w-full mr-4 mb-4">
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <div className="mt-2" key={index}>
                                    <p>
                                        {`${feedback.reviewer.firstname} ${feedback.reviewer.lastname}`}
                                        <HiStar className="inline-block mx-1" />
                                        {feedback.note}
                                    </p>
                                    <p>
                                        {Object.keys(feedback.detailedNote).map(
                                            (key) =>
                                                Rating(
                                                    key,
                                                    feedback.detailedNote,
                                                ),
                                        )}
                                    </p>
                                    <p className="py-2">{feedback.comment}</p>
                                </div>
                            ))
                        ) : (
                            <div className="mt-2">
                                <p>Aucun feedback</p>
                            </div>
                        )}
                    </div>
                </Tabs.Item>
            </Tabs>
            <GenericButton onClick={handleDelete} label="Supprimer" />
            <FlowbiteButton
                className="my-2"
                as={Link}
                href={`/provider/services/update/${id}`}
            >
                Modifier
            </FlowbiteButton>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href="/provider/services"
            >
                Retour
            </FlowbiteButton>
        </>
    );
}
