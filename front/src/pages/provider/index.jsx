import { useService } from '@/hooks/useService';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useAuthContext } from '@/providers/AuthProvider';
import { useEffect } from 'react';
import Head from 'next/head';
import renderCard from '@/components/Stats/renderCard';
import { HiOfficeBuilding, HiShoppingCart, HiUserGroup } from 'react-icons/hi';
import { useTeam } from '@/hooks/useTeam';
import { Card, Table } from 'flowbite-react';
import CurvedlineChart from '@/components/Stats/CurvedLineChart';
import dayjs from 'dayjs';

export default function Provider() {
    const { user } = useAuthContext();
    const { servicesPerEstablishment, getGetServicesPerEstablishment } =
        useService();
    const { establishments, getMyEstablishments } = useEstablishment();
    const { teamMembers, getCountTeamMembers } = useTeam();
    const { getProviderNumberEmployees } = useTeam();
    const { getLastBookings } = useService();

    useEffect(() => {
        const { id } = user;
        if (!id) return;
        getMyEstablishments(id);
    }, [user, getMyEstablishments]);

    useEffect(() => {
        if (!establishments) return;
        const establishmentIds = establishments.map(
            (establishment) => establishment.id,
        );
        getGetServicesPerEstablishment(establishmentIds);
    }, [establishments, getGetServicesPerEstablishment]);

    useEffect(() => {
        const { id } = user;
        if (!id) return;
        getCountTeamMembers(id, 'approved');
    }, [getCountTeamMembers, teamMembers, user]);
    /*
    function formatMonth(isoString) {
        return dayjs(isoString).format('YYYY-MM');
    }

    const reservationCountsByMonth = bookingsGraph.reduce(
        (acc, { startTime }) => {
            const month = formatMonth(startTime);
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        },
        {},
    );

    const sortedMonths = Object.keys(reservationCountsByMonth).sort((a, b) =>
        dayjs(a).isAfter(dayjs(b)) ? 1 : -1,
    );

    const myChartData = {
        labels: sortedMonths,
        datasets: [
            {
                label: 'Bookings per Month',
                data: sortedMonths.map(
                    (month) => reservationCountsByMonth[month],
                ),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
                type: 'time',
                time: {
                    unit: 'month',
                    parser: 'YYYY-MM',
                    tooltipFormat: 'MMMM YYYY',
                    displayFormats: {
                        month: 'MMM YYYY',
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Bookings',
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };*/

    return (
        <div className="flex h-full bg-gray-50 dark:bg-gray-900">
            <Head>
                <title>Coursia - Provider Dashboard</title>
            </Head>
            <main className="flex-1 flex flex-col px-6 gap-6">
                <div className="flex justify-between items-center mt-5">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        My Dashboard
                    </h1>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {renderCard({
                        title: 'Total Establishments',
                        value: establishments?.length || 0,
                        change: '',
                        icon: (
                            <HiOfficeBuilding className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Total Services',
                        value: servicesPerEstablishment?.flat()?.length || 0,
                        change: '',
                        icon: (
                            <HiShoppingCart className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Number of team Members',
                        value: teamMembers?.length || 0,
                        change: '',
                        icon: (
                            <HiUserGroup className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                </div>
                {/*<div className="flex flex-col gap-6 md:flex-row md:gap-8">
                    <Card className="w-full md:w-1/2">
                        <div className="p-4">
                            <h5 className="text-lg font-semibold">
                                Booking Trends
                            </h5>
                        </div>
                        <div className="p-4">
                            <CurvedlineChart
                                chartData={myChartData}
                                chartOptions={chartOptions}
                                className="w-full aspect-[4/3]"
                            />
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
                                <Table.Head>
                                    <Table.HeadCell className="w-[100px]">
                                        Id
                                    </Table.HeadCell>
                                    <Table.HeadCell>Customer</Table.HeadCell>
                                    <Table.HeadCell>Company</Table.HeadCell>
                                    <Table.HeadCell>Teacher</Table.HeadCell>
                                    <Table.HeadCell>Course Date</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {recentBookings.map((booking) => (
                                        <Table.Row key={booking.id}>
                                            <Table.Cell>
                                                {booking.id}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {booking.customer.firstname}{' '}
                                                {booking.customer.lastname}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {booking.establishment.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {booking.teacher.firstname}{' '}
                                                {booking.teacher.lastname}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {dayjs(
                                                    booking.schedule.startTime,
                                                ).format('DD/MM/YYYY')}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </Card>
                </div>*/}
            </main>
        </div>
    );
}
