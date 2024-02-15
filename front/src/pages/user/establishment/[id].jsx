import React, { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useService } from '@/hooks/useService';

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
import Image from 'next/image';
import { useToast } from '@/hooks/useToast';
import { Modal } from 'flowbite-react';
import ModalComponent from '@/components/Modal';
import Feedback from '@/components/Feedback';
import { createFeedback } from '@/services/feedbackService';
import { useAuthContext } from '@/providers/AuthProvider';
import { useFeedback } from '@/hooks/useFeedback';
import { Rating } from '@/components/Rating';
import Link from 'next/link';
import { useService } from '@/hooks/useService';

const ShowEstablishment = () => {
    const { user } = useAuthContext();
    const router = useRouter();
    const { id } = router.query;
    const { establishment, getEstablishmentById } = useEstablishment();
    const { createToastMessage } = useToast();

    const { service, getGetServicesPerEstablishment } = useService();

    const {
        feedbacks,
        detailed,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
    } = useFeedback();
    const shareContent = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then((r) =>
                createToastMessage(
                    'default',
                    'Le lien a été copié dans le presse-papier',
                ),
            );
    };

    useEffect(() => {
        getEstablishmentById(id);
    }, [getEstablishmentById, id]);

    const images =
        establishment?.photoEstablishment ||
        '/images/immeubles-parisiens-paris-zigzag.jpg';

    const Review = ({ name, date, imageSrc, content, note }) => (
        <li className="mb-[40px] pr-16">
            <div className="mb-4">
                <p className="block font-semibold text-base">
                    {name}
                    <span className="ml-2">
                        <HiStar className="inline-block mr-1" />
                        {note}
                    </span>
                </p>
                <p className="text-[#717171] text-sm">{date}</p>
            </div>
            <p className="p-0">{content}</p>
        </li>
    );

    const renderFeedback = feedbacks
        ? feedbacks?.map((feedback) => (
              <Review
                  key={feedback.id}
                  name={`${feedback.reviewer.firstname} ${feedback.reviewer.lastname}`}
                  date={feedback.createdAt}
                  imageSrc="https://a0.muscache.com/im/pictures/user/48bfe386-b947-443d-a7d8-9ba16dd87c1f.jpg?im_w=240"
                  content={feedback.comment}
                  note={feedback.note}
              />
          ))
        : 'No feedbacks';

    const ReviewsList = memo(() => (
        <ul className="grid grid-cols-2 gap-8">{renderFeedback}</ul>
    ));

    ReviewsList.displayName = 'ReviewsList';

    const RatingList = memo(() => (
        <ul className="w-full flex justify-between">
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Qualité des cours', detailed)}
                {Rating('Professionalisme', detailed)}
            </ul>
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Rapport Qualité Prix', detailed)}
                {Rating('Communication', detailed)}
            </ul>
        </ul>
    ));

    RatingList.displayName = 'RatingList';

    const onClose = async (value) => {
        setModalProps((prev) => ({ ...prev, isOpen: false }));

        await createFeedback({
            reviewer: `users/${user?.id}`,
            establishment: `establishments/${id}`,
            note: value.resultJson.average,
            comment: value.comment,
            detailedNote: value.resultJson.establishment,
        });

        getFeedbacksFromEstablishmentId(id);
        getEstablishmentNote(id);
    };

    let modalContent;
    let modalSize;
    const [modalProps, setModalProps] = useState({
        isOpen: false,
        size: '5xl',
        text: null,
        showButtons: true,
        showCloseButton: true,
        onClose: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
    });

    const setMore = (content) => {
        switch (content) {
            case 'more':
                modalSize = 'md';
                modalContent = (
                    <div className="text-[18px] border-b border-[#22222226] py-8 pb-12">
                        <p className="leading-6">
                            Veluvana is a unique bamboo house with a wonderful
                            view of Sidemen Valley, a genuine tropical landscape
                            with Mount Agung peak on its back. This getaway spot
                            is a great place to bring into reality the dream
                            adventure of the true wanderer. We invite you to
                            feel the magnificent vibes of the entire house to
                            escape the life that is full of drama into a journey
                            with ultimate joy.
                            <br />
                            sleep ...
                        </p>
                        <button
                            className="flex items-center font-semibold underline black text-[17px] mt-5"
                            onClick={() => setMore('more')}
                        >
                            Show more <HiOutlineArrowRight className="ml-1.5" />
                        </button>
                    </div>
                );
                break;
            case 'feedback':
                modalSize = '4xl';
                modalContent = (
                    <div>
                        <h1 className="text-2xl">
                            Avis sur l'établissement
                            {establishment?.name}
                        </h1>
                        <br />
                        <p>
                            Nous aimerions entendre votre avis ! Chez
                            {establishment?.name} nous sommes constamment à la
                            recherche de façons d &eapos; améliorer votre
                            expérience. Votre feedback est crucial pour nous
                            aider à mieux comprendre vos besoins et à répondre à
                            vos attentes.
                        </p>
                        <br />
                        <Feedback
                            showFeedback="establishment"
                            onCloseModal={onClose}
                        />
                    </div>
                );
                break;
            default:
                modalContent = null;
        }
        setModalProps((prev) => ({
            ...prev,
            isOpen: true,
            text: modalContent,
            size: modalSize,
            showButtons: false,
        }));
    };

    useEffect(() => {
        getEstablishmentById(id);
        getFeedbacksFromEstablishmentId(id);
        getEstablishmentNote(id);
        getGetServicesPerEstablishment(id);
    }, [
        id,
        getEstablishmentById,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
        getGetServicesPerEstablishment,
    ]);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="px-4 lg:px-10 max-w-screen-xl mx-auto w-full">
                <section className="relative mt-[2%]">
                    <div className="text-[26px] font-semibold">
                        {establishment?.name}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <div className="flex font-semibold items-center">
                                <HiStar className="mr-1.5" />
                                <p>{detailed.note}</p>
                                <span className="mx-2">·</span>
                            </div>
                            <p className="underline cursor-pointer font-semibold">
                                {feedbacks.length} reviews
                            </p>
                            <div className="flex items-center text-gray-700 ">
                                <span className="mx-1">·</span>
                                <HiSpeakerphone className="mr-1 text-gray-700 w-5 h-5" />{' '}
                                {establishment?.owner.firstname}{' '}
                                {establishment?.owner.lastname}{' '}
                                <span className="mx-1">·</span>
                            </div>
                            <p className="underline cursor-pointer font-semibold ml-1">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${establishment?.street}, ${establishment?.city} ${establishment?.zipCode}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline cursor-pointer font-semibold ml-1"
                                >
                                    {establishment?.street},{' '}
                                    {establishment?.city}{' '}
                                    {establishment?.zipCode}
                                </a>
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => shareContent()}
                                className="flex items-center px-2 py-2 rounded  font-semibold underline hover:bg-gray-100"
                            >
                                <HiOutlineUpload className="mr-2 w-4 h-4" />
                                <p>Share</p>
                            </button>
                            <button className="flex items-center px-2 py-2 rounded  font-semibold underline hover:bg-gray-100">
                                <HiOutlineHeart className="mr-2 w-4 h-4" />
                                <p>Save</p>
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 rounded-xl overflow-hidden flex justify-center items-center relative h-[70vh] min-h-[19rem]">
                        <div className="w-7/10 overflow-hidden relative group rounded-xl">
                            <Image
                                className="object-cover transition-opacity duration-200 group-hover:opacity-30 cursor-pointer"
                                width={1500} // Augmentez la largeur
                                height={1000} // Augmentez la hauteur
                                src={images}
                                quality={100}
                                alt="Main picture of establishment"
                            />
                        </div>
                    </div>
                    {/* <ul className="right w-1/2 flex flex-wrap">
                            {[1, 2, 3, 4].map((i) => (
                                <li
                                    className="corners relative ml-2 mb-2 h-1/2"
                                    key={i}
                                    style={{ width: 'calc(50% - 10px)' }}
                                >
                                    <div className="w-full h-full overflow-hidden group">
                                        <Image
                                            className={`w-full h-full object-cover transition-opacity duration-200 ${
                                                i % 2 ? 'l' : ''
                                            } group group-hover:opacity-30 group-hover:bg-black cursor-pointer`}
                                            width={1200}
                                            height={750}
                                            src={images[i].baseUrl}
                                            alt="Pictures of establishment"
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="absolute flex items-center bottom-5 right-5 md:bottom-5 md:right-5 rounded-lg px-3 py-1.5 border border-solid border-gray-800 bg-white font-semibold transition-all duration-200 focus:outline-none active:transform active:scale-90 z-50">
                            <HiViewGrid className="mr-2" />
                            <p>Show all photos</p>
                        </button> */}
                </section>
                <section className="flex justify-between relative">
                    <div className="w-3/5">
                        <div className="container2">
                            <ul className="py-8 border-b border-gray-300">
                                <li className="flex justify-start mt-0">
                                    <HiBadgeCheck className="mt-1 mr-4" />
                                    <div className="text">
                                        <p className="font-semibold text-[18px] mb-1 text-[#222]">
                                            Veluvana is a Superhost
                                        </p>
                                        <p className="leading-5 text-[#717171]">
                                            Superhosts are experienced, highly
                                            rated hosts who are committed to
                                            providing great stays for guests.
                                        </p>
                                    </div>
                                </li>
                                <li className="mt-5 flex justify-start">
                                    <HiKey className="mt-1 mr-4" />
                                    <div className="text">
                                        <p className="font-semibold text-[18px] mb-1 text-[#222]">
                                            Veluvana is a Superhost
                                        </p>
                                        <p className="leading-5 text-[#717171]">
                                            95% of recent guests gave the
                                            check-in process a 5-star rating.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div className="text-[18px] border-b border-[#22222226] py-8 pb-12">
                                <p className="leading-6">
                                    Veluvana is a unique bamboo house with a
                                    wonderful view of Sidemen Valley, a genuine
                                    tropical landscape with Mount Agung peak on
                                    its back. This getaway spot is a great place
                                    to bring into reality the dream adventure of
                                    the true wanderer. We invite you to feel the
                                    magnificent vibes of the entire house to
                                    escape the life that is full of drama into a
                                    journey with ultimate joy.
                                    <br />
                                    sleep ...
                                </p>
                                <button
                                    className="flex items-center font-semibold underline black text-[17px] mt-5"
                                    onClick={() => setMore('more')}
                                >
                                    Show more{' '}
                                    <HiOutlineArrowRight className="ml-1.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="sticky top-32 right-0 transition-all ease-out duration-300 my-12 mx-4 p-6 bg-white rounded-lg shadow-lg h-min w-[31%]">
                        <div className="flex justify-between items-center text-xl font-semibold whitespace-nowrap mb-6 text-[22px]">
                            <p className="flex items-center font-normal text-[15px]">
                                <span className="text-[22px] font-semibold">
                                    Services
                                </span>{' '}
                            </p>
                            <div className="flex items-center text-[15px]">
                                <HiStar className="mr-1" />
                                <span>{detailed.note}</span>
                                <span className="mx-1">·</span>
                                <span className="text-[#717171] font-normal">
                                    {feedbacks.length} reviews
                                </span>
                            </div>
                        </div>

                        <Link href="/services">
                            <button className="block w-full text-white font-semibold text-base py-3.5 rounded transition-transform active:scale-95 duration-300 bg-gradient-to-r from-red-600 via-red-700 to-red-800 border-none cursor-pointer">
                                Voir la disponibilité
                            </button>
                        </Link>
                    </div>
                </section>
                <div
                    id="reviews"
                    className="py-12 w-full border-b border-[#22222226]"
                >
                    <div className="mb-8 w-full">
                        <h1 className="flex items-center font-semibold text-2xl mb-4">
                            <HiStar className="mr-2" />
                            {detailed.note} · {feedbacks.length} reviews
                        </h1>
                        <RatingList />
                    </div>
                    <ReviewsList />
                    <button
                        className="py-3 px-8 text-base border border-solid border-black rounded-lg font-semibold transition duration-150 ease-in-out transform active:scale-90 hover:bg-[#f7f7f7] mt-8"
                        onClick={() => setMore('feedback')}
                    >
                        Ajouter un avis
                    </button>
                </div>
            </div>
            <ModalComponent modalProps={modalProps}>
                {modalProps.text}
            </ModalComponent>
        </div>
    );
};

export default ShowEstablishment;
