import { useEffect, useState } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import { useFeedback } from '@/hooks/useFeedback';
import { Rating } from '@/components/Rating';
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
} from 'react-icons/hi';
import { deleteFeedback } from '@/services/feedbackService';
import GenericButton from '@/components/GenericButton';
import { useToast } from '@/hooks/useToast';

export default function ListFeedback() {
    const { feedbacks, getFeedbacks } = useFeedback();
    const { createToastMessage } = useToast();
    const [click, setClick] = useState(0);

    useEffect(() => {
        getFeedbacks();
    }, [click, getFeedbacks]);

    const handleDelete = async (event, id) => {
        try {
            await deleteFeedback(id);
            setClick(click + 1);
        } catch (error) {
            createToastMessage('error', 'Une erreur est survenue');
        }
    };

    const renderFeedbacks =
        feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
                <div className="mt-2" key={index}>
                    <p>
                        <HiStar className="inline-block mx-1" />
                        {feedback.note}
                        <GenericButton
                            onClick={(event) =>
                                handleDelete(event, feedback.id)
                            }
                            label="Supprimer"
                        />
                    </p>
                    <p>
                        {Object.keys(feedback.detailedNote).map((key) =>
                            Rating(key, feedback.detailedNote),
                        )}
                    </p>
                    <p className="py-2">{feedback.comment}</p>
                </div>
            ))
        ) : (
            <div className="mt-2">
                <p>Aucun feedback</p>
            </div>
        );

    return <>{renderFeedbacks}</>;
}
