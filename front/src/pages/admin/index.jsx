import { Table, Card } from 'flowbite-react';
import { Line } from 'react-chartjs-2';
export default function AdminIndex() {
    return (
        <div className="flex h-full bg-gray-50 dark:bg-gray-900">
            <main className="flex-1 flex flex-col px-6 gap-6">
                <div className="flex justify-between items-center mt-5">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Dashboard
                    </h1>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {renderCard({
                        title: 'Total Bookings',
                        value: '1,245',
                        change: '+10% from last month',
                        icon: (
                            <PlaneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Average Rating',
                        value: '4.2',
                        change: '+0.1 from last month',
                        icon: (
                            <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Revenue',
                        value: '$1,234,567',
                        change: '+2% from last month',
                        icon: (
                            <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Active Users',
                        value: '987',
                        change: '+50% from last month',
                        icon: (
                            <GroupIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                </div>
                <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                    <Card className="w-full md:w-1/2">
                        <div className="p-4">
                            <h5 className="text-lg font-semibold">
                                Booking Trends
                            </h5>
                        </div>
                        <div className="p-4">
                            <CurvedlineChart className="w-full aspect-[4/3]" />
                        </div>
                    </Card>

                    <Card className="w-full md:w-1/2 h-fit">
                        <div className="p-4">
                            <h5 className="text-lg font-semibold">
                                Recent Bookings
                            </h5>
                        </div>
                        <div className="p-4">
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="w-[100px]">
                                            Booking ID
                                        </th>
                                        <th>Status</th>
                                        <th>Price</th>
                                        <th className="text-right">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-medium">BK001</td>
                                        <td>Confirmed</td>
                                        <td>$250.00</td>
                                        <td className="text-right">John Doe</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">BK002</td>
                                        <td>Pending</td>
                                        <td>$150.00</td>
                                        <td className="text-right">
                                            Jane Smith
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">BK003</td>
                                        <td>Cancelled</td>
                                        <td>$350.00</td>
                                        <td className="text-right">
                                            Bob Johnson
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function CurvedlineChart(props) {
    const data = {
        labels: [
            '2018-01-01',
            '2018-01-02',
            '2018-01-03',
            '2018-01-04',
            '2018-01-05',
            '2018-01-06',
            '2018-01-07',
            '2018-01-08',
        ],
        datasets: [
            {
                label: 'Series B',
                data: [7, 5, 11, 9, 12, 16, 13, 13],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Series A',
                data: [9, 8, 13, 6, 8, 14, 11, 12],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM D',
                    },
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return <Line data={data} options={options} {...props} />;
}

function DollarSignIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http:www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );
}

function GroupIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http:www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            <rect width="7" height="5" x="7" y="7" rx="1" />
            <rect width="7" height="5" x="10" y="12" rx="1" />
        </svg>
    );
}

function PlaneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http:www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
    );
}

function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http:www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
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
