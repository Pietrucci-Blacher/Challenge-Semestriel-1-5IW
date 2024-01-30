import React, { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useEstablishment } from '@/hooks/useEstablishment';
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
export const DateView = () => {
    /*    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="dateview">
                <DateCalendar disablePast showDaysOutsideCurrentMonth />
                <DateCalendar disablePast showDaysOutsideCurrentMonth />
            </div>
        </LocalizationProvider>
    );*/
};
const ShowEstablishment = () => {
    const { user } = useAuthContext();
    const router = useRouter();
    const { id } = router.query;
    const { establishment, getEstablishmentById } = useEstablishment();
    const { createToastMessage } = useToast();
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

    const baseUrl = 'https://fakeimg.pl/'; // Replace with your desired base URL for real images

    const images = establishment?.images || [
        {
            id: 1,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 1',
        },
        {
            id: 2,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 2',
        },
        {
            id: 3,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 3',
        },
        {
            id: 4,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 4',
        },
        {
            id: 5,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 5',
        },
        {
            id: 6,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 6',
        },
        {
            id: 7,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 7',
        },
        {
            id: 8,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 8',
        },
        {
            id: 9,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 9',
        },
        {
            id: 10,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 10',
        },
        {
            id: 11,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 11',
        },
        {
            id: 12,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 12',
        },
        {
            id: 13,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 13',
        },
        {
            id: 14,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 14',
        },
        {
            id: 15,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 15',
        },
        {
            id: 16,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 16',
        },
        {
            id: 17,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 17',
        },
        {
            id: 18,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 18',
        },
        {
            id: 19,
            baseUrl: `${baseUrl}/300`,
            description: 'Real Image 19',
        },
    ];

    const Review = ({ name, date, imageSrc, content }) => (
        <li className="mb-[40px] pr-16">
            <div className="mb-4">
                <Image
                    className="float-left mr-3 rounded-[100%]"
                    src={imageSrc}
                    width={40}
                    height={40}
                    alt={`Profile of ${name}`}
                />
                <p className="block font-semibold text-base">{name}</p>
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
                <li className="pr-16 flex items-center mb-4">
                    <p className="text-[17px] w-full">Cleanliness</p>
                    <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                        <span className="w-[92%] text-[#222] bg-black block h-1"></span>
                    </div>
                    <p className="text-[13px] font-semibold">4.8</p>
                </li>
                <li className="pr-16 flex items-center mb-4">
                    <p className="text-[17px] w-full">Communication</p>
                    <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                        <span className="w-[96%] text-[#222] bg-black block h-1"></span>
                    </div>
                    <p className="text-[13px] font-semibold">4.9</p>
                </li>
                <li className="pr-16 flex items-center mb-4">
                    <p className="text-[17px] w-full">Check-in</p>
                    <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                        <span className="w-[96%] text-[#222] bg-black block h-1"></span>
                    </div>
                    <p className="text-[13px] font-semibold">4.9</p>
                </li>
            </ul>
            <ul className="w-2/5 block mr-[10%]">
                <li className="pr-16 flex items-center mb-4">
                    <p className="text-[17px] w-full">Accuracy</p>
                    <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                        <span className="w-[96%] text-[#222] bg-black block h-1"></span>
                    </div>
                    <p className="text-[13px] font-semibold">4.9</p>
                </li>
                <li className="pr-16 flex items-center mb-4">
                    <p className="text-[17px] w-full">Location</p>
                    <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                        <span className="w-[92%] text-[#222] bg-black block h-1"></span>
                    </div>
                    <p className="text-[13px] font-semibold">4.8</p>
                </li>
                <li className="pr-16 flex items-center mb-4">
                    <p className="text-[17px] w-full">Value</p>
                    <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                        <span className="w-[90%] text-[#222] bg-black block h-1"></span>
                    </div>
                    <p className="text-[13px] font-semibold">4.7</p>
                </li>
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
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
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
    }, [
        id,
        getEstablishmentById,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
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
                                {establishment?.city} , {establishment?.zipCode}
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
                    <div className="mt-6 rounded-xl overflow-hidden flex relative max-h-[550px] h-[70vh] min-h-[19rem]">
                        <div className="w-1/2 overflow-hidden relative group">
                            <Image
                                className="left full-width full-height object-cover transition-opacity duration-200 group-hover:opacity-30 cursor-pointer"
                                width={1200}
                                height={750}
                                src={images[0].baseUrl}
                                quality={100}
                                alt="Main picture of establishment"
                            />
                        </div>
                        <ul className="right w-1/2 flex flex-wrap">
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
                        </button>
                    </div>
                </section>
                <section className="flex justify-between relative">
                    <div className="w-3/5">
                        <div className="relative w-full py-12 pb-6 border-b border-[#21212126]">
                            <h1 className="text-[22px] mb-2">
                                Treehouse hosted by Veluvana
                            </h1>
                            <p className="text-lg">
                                2 guests <span> · </span>1 bedroom
                                <span> · </span>1 bed
                                <span> · </span>1.5 baths
                            </p>
                            <div className="absolute right-1 top-12 w-14 h-14 overflow-hidden">
                                <Image
                                    src="https://a0.muscache.com/im/pictures/user/bb9ba580-9b3b-4402-ac92-3976abe1a178.jpg?im_w=240"
                                    width={56}
                                    height={56}
                                    alt="host"
                                    className="w-full h-full rounded-full"
                                />
                                <HiBadgeCheck className="absolute bottom-0 right-[-5px] w-[22px] h-[22px]" />
                            </div>
                        </div>
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
                                    € 472
                                </span>{' '}
                                night
                            </p>
                            <div className="flex items-center text-[15px]">
                                <HiStar className="mr-1" />5
                                <span className="mx-1">·</span>
                                <span className="text-[#717171] font-normal">
                                    {feedbacks.length} reviews
                                </span>
                            </div>
                        </div>

                        <div className="rounded border border-solid border-black cursor-pointer mb-4">
                            <div className="flex w-full">
                                <div className="w-1/2 border-b border-r border-solid border-black h-14 flex pl-3 items-start flex-col justify-center">
                                    <h3 className="text-[10px] font-bold text-center leading-[12px]">
                                        CHECK-IN
                                    </h3>
                                    <p className="text-[14px] text-center text-gray-700">
                                        Add date
                                    </p>
                                </div>
                                <div className="w-1/2 border-b border-solid border-black h-14 flex pl-3 items-start flex-col justify-center">
                                    <h3 className="text-[10px] font-bold text-center leading-[12px]">
                                        CHECKOUT
                                    </h3>
                                    <p className="text-[14px] text-center text-gray-700">
                                        Add date
                                    </p>
                                </div>
                            </div>
                            <div className="h-14 flex pl-3 relative items-start flex-col justify-center">
                                <h3 className="text-[10px] font-bold text-center leading-[12px]">
                                    GUESTS
                                </h3>
                                <p className="text-[14px] text-gray-700">
                                    Add date
                                </p>
                                <button className="absolute right-6">
                                    <HiArrowDown />
                                </button>
                            </div>
                        </div>

                        <button
                            className="w-full text-white font-semibold text-base py-3.5 rounded transition-transform active:scale-95 duration-300 "
                            style={{
                                background:
                                    'linear-gradient(to right, #e61e4d 0%, #e31c5f 50%, #d70466 100%)',
                            }}
                        >
                            Voir la disponibilité
                        </button>
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
