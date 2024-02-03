import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
    const renderRating = (name, container) => {
        const rating = container[name] || 0;
        const percentage = (rating / 5) * 100;

        return (
            <li key={name} className="pr-16 flex items-center">
                <p className="text-[17px] w-full">{name}</p>
                <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                    <span
                        className="text-[#222] bg-black block h-1"
                        style={{ width: `${percentage}%` }}
                    ></span>
                </div>
                <p className="w-1/6 text-[13px] font-semibold mr-2">{rating}</p>
            </li>
        );
    };

    const renderService = service ? (
        <>
            <div className="w-full mr-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded mb-4">
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
                <div className="editor-html">
                    {convertDataToHtml(service.body.blocks)}
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
                                                renderRating(
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
