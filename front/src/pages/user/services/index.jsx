import Input from '@/components/Input';
import { Button, Modal } from 'flowbite-react';
import Slider from '@/components/Slider';
import { useService } from '@/hooks/useService';
import { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { Image } from 'next/image';
// import {useRouter} from "next/router";

export default function Services() {
    // const router = useRouter()
    const { services, getAllServices } = useService();

    const [formData, setFormData] = useState({
        title: '',
        minPrice: 0,
        maxPrice: 1000,
    });
    const [openModal, setOpenModal] = useState(false);

    // useEffect(() => {
    //     getAllServices();
    // }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getAllServices(formData);
        }, 200);
        return () => clearTimeout(timer);
    }, [formData]);

    const handleInputSearchChange = (value) => {
        setFormData({ ...formData, title: value });
    };

    const handleSliderMinPriceChange = (value) => {
        setFormData({ ...formData, minPrice: parseInt(value) || 0 });
    };

    const handleSliderMaxPriceChange = (value) => {
        setFormData({ ...formData, maxPrice: parseInt(value) || 0 });
    };

    // const goToServiceById = (id)=>{
    //     router.push(`/services/${id}`)
    // }
    const renderServices = services?.map((service) => (
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 py-4" key={service.id}>
            <Card
                className="max-w-sm card-hover"
                renderImage={() => (
                    <img
                        src={`https://localhost/media/${service.imagePath}`}
                        alt="Picture of the author"
                        className="w-full rounded-t-lg h-48 object-cover"
                        width={500}
                        height={500}
                    />
                )}
                href={`/services/${service.id}`}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {service?.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                    Duration: {service?.duration} min
                </p>
                <p className="font-bold tracking-tight text-gray-900 dark:text-white">
                    {service?.price} €
                </p>
            </Card>
        </div>
    ));
    return (
        <>
            <div className="mb-4 flex">
                <Input
                    type="text"
                    placeholder="Entrer un service"
                    value={formData.title}
                    onChange={handleInputSearchChange}
                />
                <Button onClick={() => setOpenModal(true)}>Filtrer</Button>
            </div>
            <div className="flex flex-wrap mx-2 ">{renderServices}</div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Filtre</Modal.Header>
                <Modal.Body>
                    <Slider
                        id="minPrice"
                        label={`Prix minimum: ${formData.minPrice}€`}
                        value={formData.minPrice}
                        max="3000"
                        onChange={handleSliderMinPriceChange}
                    />
                    <Slider
                        id="maxPrice"
                        label={`Prix maximum: ${formData.maxPrice}€`}
                        value={formData.maxPrice}
                        max="3000"
                        onChange={handleSliderMaxPriceChange}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
