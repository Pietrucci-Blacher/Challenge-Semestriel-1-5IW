import { useEffect, useState } from 'react';
import { Button, Table } from 'flowbite-react';
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
import Input from '@/components/Input';

export default function ListFeedback() {
    const { feedbacks, getFeedbacks } = useFeedback();
    const { createToastMessage } = useToast();
    const [click, setClick] = useState(0);
    const [formData, setFormData] = useState({ comment: '' });

    useEffect(() => {
        const timer = setTimeout(() => {
            getFeedbacks(formData);
        }, 200);
        return () => clearTimeout(timer);
    }, [click, getFeedbacks, formData]);

    const handleDelete = async (event, id) => {
        try {
            await deleteFeedback(id);
            setClick(click + 1);
        } catch (error) {
            createToastMessage('error', 'Une erreur est survenue');
        }
    };

    const handleInputSearchChange = (value) => {
        setFormData({ ...formData, comment: value });
    };

    const renderFeedbacks =
        feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
                <div className="mt-2" key={index}>
                    <p className="flex">
                        <HiStar className="inline-block mx-1" />
                        {feedback.note}
                        <span
                            className="ml-2 text-red-500 cursor-pointer select-none"
                            onClick={(event) =>
                                handleDelete(event, feedback.id)
                            }
                        >
                            Supprimer
                        </span>
                    </p>
                    <p>
                        {feedback.reviewer.firstname}{' '}
                        {feedback.reviewer.lastname}
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

    return (
        <>
            <div className="my-4 flex">
                <Input
                    type="text"
                    placeholder="Entrer un service"
                    value={formData.comment}
                    onChange={handleInputSearchChange}
                />
            </div>
            {renderFeedbacks}
        </>
    );
}
