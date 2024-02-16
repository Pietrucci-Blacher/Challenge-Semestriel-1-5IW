import { Card } from 'flowbite-react';

function renderCard({ title, value, change, icon }) {
    return (
        <Card>
            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
                <h5 className="text-sm font-medium">{title}</h5>
                {icon}
            </div>
            <div className="card-content">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {change}
                </p>
            </div>
        </Card>
    );
}

export default renderCard;
