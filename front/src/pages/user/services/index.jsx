import { useService } from '@/hooks/useService';
import { useEffect } from 'react';
import { Card } from 'flowbite-react';
// import {useRouter} from "next/router";

export default function Services() {
    // const router = useRouter()
    const { services, getAllServices } = useService();

    useEffect(() => {
        getAllServices();
    }, []);

    // const goToServiceById = (id)=>{
    //     router.push(`/services/${id}`)
    // }
    return (
        <>
            <h2>services</h2>
            <div className="flex flex-wrap mx-2 ">
                {services?.map((service) => (
                    <div
                        className="w-full sm:w-1/2 md:w-1/3 px-2 py-4"
                        key={service.id}
                    >
                        <Card
                            className="max-w-sm card-hover"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc="https://www.flowbite-react.com/images/blog/image-1.jpg"
                            href={`/services/${service.id}`}
                        >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {service?.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 truncate-text">
                                {service?.description}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                                Duration: {service?.duration} min
                            </p>
                            <p className="font-bold tracking-tight text-gray-900 dark:text-white">
                                {service?.price} €
                            </p>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}
