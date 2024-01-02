import Link from 'next/link';
import { Table, Button, Card } from 'flowbite-react';
import PropTypes from 'prop-types';
import { Chart } from 'react-charts';

export default function AdminIndex() {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <aside className="w-64 bg-white dark:bg-gray-800 overflow-auto">
                <nav className="flex flex-col p-4 gap-4">
                    <Link
                        className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100"
                        href="#"
                    >
                        <PlaneIcon className="w-6 h-6" />
                        <span>Dashboard</span>
                    </Link>
                    <Button
                        className="rounded-full"
                        size="icon"
                        variant="ghost"
                    >
                        <img
                            alt="Avatar"
                            className="rounded-full"
                            height="32"
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: '32/32',
                                objectFit: 'cover',
                            }}
                            width="32"
                        />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </nav>
            </aside>
            <main className="flex-1 flex flex-col p-6 gap-6">
                <div className="flex justify-between items-center">
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

                    <Card className="w-full md:w-1/2">
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
    return (
        <div {...props}>
            <Chart
                data={[
                    {
                        id: 'B',
                        data: [
                            { x: '2018-01-01', y: 7 },
                            { x: '2018-01-02', y: 5 },
                            { x: '2018-01-03', y: 11 },
                            { x: '2018-01-04', y: 9 },
                            { x: '2018-01-05', y: 12 },
                            { x: '2018-01-06', y: 16 },
                            { x: '2018-01-07', y: 13 },
                            { x: '2018-01-08', y: 13 },
                        ],
                    },
                    {
                        id: 'A',
                        data: [
                            { x: '2018-01-01', y: 9 },
                            { x: '2018-01-02', y: 8 },
                            { x: '2018-01-03', y: 13 },
                            { x: '2018-01-04', y: 6 },
                            { x: '2018-01-05', y: 8 },
                            { x: '2018-01-06', y: 14 },
                            { x: '2018-01-07', y: 11 },
                            { x: '2018-01-08', y: 12 },
                        ],
                    },
                ]}
                enableCrosshair={false}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 'auto',
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'X',
                    legendOffset: 45,
                    legendPosition: 'middle',
                    format: '%b %d',
                    tickValues: 'every 1 day',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Y',
                    legendOffset: -45,
                    legendPosition: 'middle',
                }}
                colors={{ scheme: 'paired' }}
                pointSize={5}
                pointColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                pointBorderWidth={2}
                pointBorderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                pointLabelYOffset={-12}
                useMesh={true}
                curve="monotoneX"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolSize: 14,
                        symbolShape: 'circle',
                    },
                ]}
                theme={{
                    tooltip: {
                        container: {
                            fontSize: '12px',
                        },
                    },
                }}
                role="application"
            />
        </div>
    );
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

renderCard.prototype = {
    title: PropTypes.string,
    value: PropTypes.string,
    change: PropTypes.string,
    icon: PropTypes.element,
};
