import { useRouter } from "next/router";
import { useEstablishment } from "@/hooks/useEstablishment";
import { useEffect } from "react";
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
} from "react-icons/hi";
import Image from "next/image";
import { BedIcon } from "@/components/icons/extras";
import { useToast } from "@/hooks/useToast";

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
  const router = useRouter();
  const { id } = router.query;
  const { establishment, getEstablishmentById } = useEstablishment();
  const { createToastMessage } = useToast();

  const shareContent = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then((r) =>
        createToastMessage(
          "default",
          "Le lien a été copié dans le presse-papier",
        ),
      );
  };

  const baseUrl = "https://fakeimg.pl/"; // Replace with your desired base URL for real images

  const images = establishment?.images || [
    {
      id: 1,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 1",
    },
    {
      id: 2,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 2",
    },
    {
      id: 3,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 3",
    },
    {
      id: 4,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 4",
    },
    {
      id: 5,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 5",
    },
    {
      id: 6,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 6",
    },
    {
      id: 7,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 7",
    },
    {
      id: 8,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 8",
    },
    {
      id: 9,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 9",
    },
    {
      id: 10,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 10",
    },
    {
      id: 11,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 11",
    },
    {
      id: 12,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 12",
    },
    {
      id: 13,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 13",
    },
    {
      id: 14,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 14",
    },
    {
      id: 15,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 15",
    },
    {
      id: 16,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 16",
    },
    {
      id: 17,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 17",
    },
    {
      id: 18,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 18",
    },
    {
      id: 19,
      baseUrl: `${baseUrl}/300`,
      description: "Real Image 19",
    },
  ];

  const Review = ({ name, date, imageSrc, content }) => (
    <li>
      <div className="profile">
        <img src={imageSrc} width={40} height={40} alt={`Profile of ${name}`} />
        <p className="name">{name}</p>
        <p className="date">{date}</p>
      </div>
      <p className="content">{content}</p>
    </li>
  );

  const ReviewsList = () => (
      <ul className="grid grid-cols-2 gap-8">
        <Review
            name="Aldo"
            date="June 2023"
            imageSrc="https://a0.muscache.com/im/pictures/user/48bfe386-b947-443d-a7d8-9ba16dd87c1f.jpg?im_w=240"
            content="The service is impeccable. The staff is super friendly and responsive. We highly recommend it."
        />
        <Review
            name="Anisha"
            date="June 2023"
            imageSrc="https://a0.muscache.com/im/pictures/user/6d4366ac-fea5-4865-a914-5bf6cc2c8286.jpg?im_w=240"
            content="We loved the place to stay; beautiful night was so good & lovely morning sounds."
        />
        <Review
            name="Sanal"
            date="June 2023"
            imageSrc="https://a0.muscache.com/im/pictures/user/User-44531743/original/9f9b36c8-22fd-4f51-a2e2-1eb85c0e1865.jpeg?im_w=240"
            content="We had a very relaxing time in the villa. The hosts were very responsive when we had questions. The food they cooked was also great!"
        />
        <Review
            name="Yiting"
            date="May 2023"
            imageSrc="https://a0.muscache.com/im/pictures/user/User-56556621/original/106504df-e131-45b2-8bab-aa809f8f5737.jpeg?im_w=240"
            content="We had a wonderful time at Veluvana!"
        />
        <Review
            name="Muhammad"
            date="May 2023"
            imageSrc="https://a0.muscache.com/im/pictures/user/fa2b5a4d-fc11-438f-9ffc-21c6aab6129f.jpg?im_w=240"
            content="It was just perfect. Thank you 🙏"
        />
        <Review
            name="Alex"
            date="May 2023"
            imageSrc="https://a0.muscache.com/im/pictures/user/7832c8d6-16e3-4aed-a923-d5c57c2350db.jpg?im_w=240"
            content="It was an amazing experience. I will never forget the words before entering ARE YOU READY, and we saw this wonderful place."
        />
      </ul>
  );

  const RatingList = () => (
      <ul className="a">
      <ul className="l">
        <li>
          <p>Cleanliness</p>
          <div className="div">
            <span className="m"></span>
          </div>
          <p>4.8</p>
        </li>
        <li>
          <p>Communication</p>
          <div className="div">
            <span></span>
          </div>
          <p>4.9</p>
        </li>
        <li>
          <p>Check-in</p>
          <div className="div">
            <span></span>
          </div>
          <p>4.9</p>
        </li>
      </ul>
      <ul className="l">
        <li>
          <p>Accuracy</p>
          <div className="div">
            <span></span>
          </div>
          <p>4.9</p>
        </li>
        <li>
          <p>Location</p>
          <div className="div">
            <span className="m"></span>
          </div>
          <p>4.8</p>
        </li>
        <li>
          <p>Value</p>
          <div className="div">
            <span className="s"></span>
          </div>
          <p>4.7</p>
        </li>
      </ul>
    </ul>
  );

  const setMore = (content) => {
    // Open popup
    console.log(content);

    Popover;
  };

  useEffect(() => {
    getEstablishmentById(id);
  }, [id]);

  return (
    <div className="place flex flex-col items-center w-full">
      <div className="content px-4 lg:px-10 max-w-screen-xl mx-auto w-full">
        <section className="upx relative mt-[2%]">
          <div className="text-[26px] font-semibold">
            {establishment?.name}Toto
          </div>
          {/*<div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <div className="flex font-semibold items-center">
                                <HiStar className="mr-1.5"/>
                                <p>2</p>
                                <span className="mx-2">·</span>
                            </div>
                            <p className="underline cursor-pointer font-semibold">130 reviews</p>
                            <div className="flex items-center text-gray-700 ">
                                <span className="mx-1">·</span>
                                <HiSpeakerphone className="mr-1 text-gray-700 w-5 h-5"/> Superhost <span
                                className="mx-1">·</span>
                            </div>
                            <p className="underline cursor-pointer font-semibold ml-1">Toto</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => shareContent()}
                                    className="flex items-center px-2 py-2 rounded  font-semibold underline hover:bg-gray-100">
                                <HiOutlineUpload className="mr-2 w-4 h-4"/>
                                <p>Share</p>
                            </button>
                            <button
                                className="flex items-center px-2 py-2 rounded  font-semibold underline hover:bg-gray-100">
                                <HiOutlineHeart className="mr-2 w-4 h-4"/>
                                <p>Save</p>
                            </button>
                        </div>*/}
          <div className="images mt-[24px] rounded-xl overflow-hidden flex relative max-h-[550px] h-[70vh] min-h[19rem]">
            <div className="images w-1/2 overflow-hidden relative hover:opacity-30">
              <Image
                className="full-width full-height object-cover"
                width={1200}
                height={750}
                src={images[0].baseUrl}
                quality={100}
              />
              <div className="layer"></div>
            </div>
            <ul className="right">
              {[1, 2, 3, 4].map((i) => (
                <li key={i}>
                  <div className="w-full h-full overflow-hidden ">
                    <Image
                      class={`w-full h-full object-cover ${i % 2 ? "l" : ""}`}
                      width={1200}
                      height={750}
                      src={images[i].baseUrl}
                    />
                  </div>
                  <div className="layer"></div>
                </li>
              ))}
            </ul>
            <button className="absolute flex items-center bottom-5 right-5 md:bottom-5 md:right-5 rounded-lg px-3 py-1.5 border border-solid border-gray-800 bg-white font-semibold transition-all duration-200 focus:outline-none active:transform active:scale-90 z-50">
              <HiViewGrid class="mr-2" />
              <p>Show all photos</p>
            </button>
          </div>
        </section>
        <section className="body">
          <div className="left">
            <div className="container1">
              <h1 className="bold">Treehouse hosted by Veluvana</h1>
              <p>
                2 guests <span> · </span>1 bedroom<span> · </span>1 bed
                <span> · </span>1.5 baths
              </p>
              <div className="host">
                <Image
                    src="https://a0.muscache.com/im/pictures/user/bb9ba580-9b3b-4402-ac92-3976abe1a178.jpg?im_w=240"
                    width={56}
                    height={56}
                    alt="host"
                />
                <HiBadgeCheck/>
              </div>
            </div>
            <div className="container2">
              <ul>
                <li>
                  <HiBadgeCheck/>
                  <div className="text">
                    <p className="t">Veluvana is a Superhost</p>
                    <p>
                      Superhosts are experienced, highly rated hosts who are
                      committed to providing great stays for guests.
                    </p>
                  </div>
                </li>
                <li>
                  <HiKey/>
                  <div className="text">
                    <p className="t">Veluvana is a Superhost</p>
                    <p>
                      95% of recent guests gave the check-in process a 5-star
                      rating.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="description">
                <p>
                  Veluvana is a unique bamboo house with a wonderful view of
                  Sidemen Valley, a genuine tropical landscape with Mount Agung
                  peak on its back. This getaway spot is a great place to bring
                  into reality the dream adventure of the true wanderer. We
                  invite you to feel the magnificent vibes of the entire house
                  to escape the life that is full of drama into a journey with
                  ultimate joy.
                  <br/>
                  sleep ...
                </p>
                <button onClick={() => setMore("more")}>
                  Show more <HiOutlineArrowRight/>
                </button>
              </div>
            </div>
          </div>
          <div
              className="reserve sticky top-32 right-0 transition-all duration-300 mx-4 mb-16 p-6 bg-white rounded-lg shadow-md">
            <div className="up flex justify-between items-center text-xl font-semibold whitespace-nowrap mb-6">
              <p className="l flex items-center">
                <span className="text-[22px] font-semibold">€ 472</span> night
              </p>
              <div className="r flex items-center text-base">
                <HiStar className="mr-1"/>
                5<span className="dot mx-1">·</span>
                <span className="rc">130 reviews</span>
              </div>
            </div>

            <div className="rounded border border-solid border-black cursor-pointer mb-4">
              <div className="flex w-full">
                <div className="w-1/2 border-b border-r border-solid border-black h-14 flex pl-3 items-start flex-col justify-center">
                  <h3 className="text-[10px] font-bold text-center leading-[12px]">CHECK-IN</h3>
                  <p className="text-[14px] text-center text-gray-700">Add date</p>
                </div>
                <div className="w-1/2 border-b border-solid border-black h-14 flex pl-3 items-start flex-col justify-center">
                  <h3 className="text-[10px] font-bold text-center leading-[12px]">CHECKOUT</h3>
                  <p className="text-[14px] text-center text-gray-700">Add date</p>
                </div>
              </div>
              <div className="h-14 flex pl-3 relative items-start flex-col justify-center">
                <h3 className="text-[10px] font-bold text-center leading-[12px]">GUESTS</h3>
                <p className="text-[14px] text-gray-700">Add date</p>
                <button className="absolute right-6">
                  <HiArrowDown/>
                </button>
              </div>
            </div>

            <button
                className="w-full text-white font-semibold text-base py-3.5 rounded transition-transform active:scale-95 duration-300 "
                style={{
                  background: 'linear-gradient(to right, #e61e4d 0%, #e31c5f 50%, #d70466 100%)',
                }}
            >
              Voir la disponibilité
            </button>
          </div>
        </section>
        <div id="reviews">
          <div className="upp">
            <h1>
              <HiStar/>
              4.86 · 126 reviews
            </h1>
            <RatingList/>
          </div>
          <ReviewsList/>
          <button
              className="py-3 px-8 text-[17px] border border-solid border-black rounded-lg font-semibold text-base transition duration-150 ease-in-out transform active:scale-90  hover:bg-[#f7f7f7] mt-8"
              onClick={() => setMore("reviews")}
          >
            Show all 126 reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowEstablishment;
