import { useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import { useFeedback } from '@/hooks/useFeedback';
import { useAuthContext } from '@/providers/AuthProvider';
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

export default function ListFeedback() {
    const { user } = useAuthContext();
    const { feedbacks, getFeedbacksFromUserId } = useFeedback();

    useEffect(() => {
        const id = user?.id;
        if (!id) return;
        getFeedbacksFromUserId(id);
    }, [user, getFeedbacksFromUserId]);

    const renderFeedbacks =
        feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
                <div className="mt-2" key={index}>
                    <p>
                        <HiStar className="inline-block mx-1" />
                        {feedback.note}
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
