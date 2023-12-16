import Input from "@/components/Input";
import { useService } from "@/hooks/useService";
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import Slider from "@/components/Slider";

export default function ListServices() {
    const { services, getAllServices } = useService();

    const [formData, setFormData] = useState({
        title: "",
        minPrice: 0,
        maxPrice: 1000,
    });
    const [openModal, setOpenModal] = useState(false);

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
        setFormData({ ...formData, minPrice: parseInt(value) || 0});
    };

    const handleSliderMaxPriceChange = (value) => {
        setFormData({ ...formData, maxPrice: parseInt(value) || 0});
    };

    // imgSrc="https://www.logolynx.com/images/logolynx/12/127ea6d2d0a5b4d1605c37802b13c82c.png"
    const renderCard = services
        ? services.map((service, key) => (
              <ServiceCard
                  key={key}
                  title={service.title}
                  price={service.price}
                  imgSrc={service.image}
                  imgAlt="image"
              />
          ))
        : null;

    return (
        <>
            <div className="mb-4 flex">
                <Input
                    type="text"
                    placeholder="Entrer un service"
                    value={formData.title}
                    onChange={handleInputSearchChange}
                    className="w-full"
                />
                <Button onClick={() => setOpenModal(true)}>Filtrer</Button>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {renderCard}
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
