import { useService } from '@/hooks/useService';
import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'flowbite-react';
import Input from '@/components/Input';
import Slider from '@/components/Slider';
import Image from 'next/image';

export default function Services() {
    const { services, getAllServices, getServicesByFilters } = useService();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getAllServices();
    }, [getAllServices]);

    const [formData, setFormData] = useState({
        title: '',
        minPrice: 0,
        maxPrice: 3000,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            getServicesByFilters(formData);
        }, 200);
        return () => clearTimeout(timer);
    }, [formData, getServicesByFilters]);

    const handleInputSearchChange = (value) => {
        setFormData({ ...formData, title: value });
    };

    const handleSliderMinPriceChange = (value) => {
        setFormData({ ...formData, minPrice: parseInt(value) || 0 });
    };

    const handleSliderMaxPriceChange = (value) => {
        setFormData({ ...formData, maxPrice: parseInt(value) || 0 });
    };

    return (
        <>
            <div>
                <div className="mb-4 flex">
                    <Input
                        type="text"
                        placeholder="Entrer un service"
                        value={formData.title}
                        onChange={handleInputSearchChange}
                        className="w-full"
                    />
                    <Button className="ml-2" onClick={() => setOpenModal(true)}>
                        Filtrer
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap mx-2 ">
                {services?.map((service) => (
                    <div
                        className="w-full sm:w-1/2 md:w-1/3 px-2 py-4"
                        key={service.id}
                    >
                        <Card
                            className="max-w-sm card-hover transform transition-transform duration-1000 hover:scale-105"
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
