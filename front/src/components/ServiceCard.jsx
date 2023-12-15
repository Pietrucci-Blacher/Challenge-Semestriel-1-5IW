import { Card } from "flowbite-react";

export default function ServiceCard({
    title = "",
    imgSrc = "",
    imgAlt = "",
    className = "",
    price = "",
}) {
    return (
        <Card className={className} imgAlt={imgAlt} imgSrc={imgSrc}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <span className="font-normal text-gray-700 dark:text-gray-400">
                {price} €
            </span>
        </Card>
    );
}
