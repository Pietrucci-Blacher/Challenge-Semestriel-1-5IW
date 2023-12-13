import Input from "@/components/Input";
import { useService } from "@/hooks/useService";
import { useEffect, useState } from "react";
import { Button as FlowbiteButton, Table } from "flowbite-react";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

export default function ListServices() {
    const { services, getAllServices } = useService();

    const [formData, setFormData] = useState({ title: "" });

    useEffect(() => {
        getAllServices(formData);
    }, [formData]);

    const handleInputSearchChange = (value) => {
        setFormData({ ...formData, title: value });
    };

    const renderCard = services
        ? services.map((service, key) => (
              <ServiceCard
                  key={key}
                  title={service.title}
                  price={service.price}
                  imgSrc="/images/blog/image-1.jpg"
                  imgAlt="test"
              />
          ))
        : null;

    return (
        <>
            <Input
                type="text"
                placeholder="Entrer un service"
                value={formData.title}
                onChange={handleInputSearchChange}
                className="mb-4"
            />
            <div className="grid grid-cols-4 gap-4">
                {renderCard}
            </div>
        </>
    );
}
