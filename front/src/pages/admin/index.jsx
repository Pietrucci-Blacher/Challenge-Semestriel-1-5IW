import { Table, Card } from 'flowbite-react';
import { useStats } from '@/hooks/useStats';
import { useEffect } from 'react';
import { HiHome, HiAcademicCap, HiUserGroup, HiStar } from 'react-icons/hi';
import CurvedlineChart from '@/components/Stats/CurvedLineChart';
import dayjs from 'dayjs';
export default function AdminIndex() {
    const {
        userNumber,
        getUserNumber,
        bestCompany,
        getBestFeedBackCompany,
        companieNumber,
        getCompaniesNumber,
        bookingNumber,
        getTotalBookings,
        recentBookings,
        getRecentBookings,
        bookingsGraph,
        getGraphReservations,
    } = useStats();

    useEffect(() => {
        getUserNumber();
        getBestFeedBackCompany();
        getCompaniesNumber();
        getTotalBookings();
        getRecentBookings();
        getGraphReservations();
    }, [
        getUserNumber,
        getBestFeedBackCompany,
        getCompaniesNumber,
        getTotalBookings,
        getRecentBookings,
        getGraphReservations,
    ]);

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

    // Filtrer pour ne conserver que les feedbacks concernant des établissements
    const establishmentFeedbacks = bestCompany.filter(
        (feedback) => feedback.establishment,
    );

    const feedbacksWithName = establishmentFeedbacks.map((feedback) => {
        // Comme on a déjà filtré pour ne garder que les feedbacks d'établissements, pas besoin de vérifier `feedback.service`
        const name = feedback.establishment.name;
        return {
            name,
            note: feedback.note,
        };
    });

    const averages = feedbacksWithName.reduce((acc, { name, note }) => {
        if (!acc[name]) {
            acc[name] = { total: 0, count: 0 };
        }
        acc[name].total += note;
        acc[name].count += 1;
        return acc;
    }, {});

    const averageList = Object.keys(averages).map((name) => ({
        name,
        average: averages[name].total / averages[name].count,
    }));

    const bestCompanyObject = averageList.reduce(
        (best, current) => (best.average > current.average ? best : current),
        { name: null, average: 0 },
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
    };

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
                        value: bookingNumber,
                        change: '',
                        icon: (
                            <HiAcademicCap className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Best Establishment',
                        value: bestCompanyObject?.name || 'No data',
                        change: `With an average of: ${bestCompanyObject?.average.toFixed(
                            2,
                        )}`,
                        icon: (
                            <HiStar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Active companies',
                        value: companieNumber,
                        change: '',
                        icon: (
                            <HiHome className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ),
                    })}
                    {renderCard({
                        title: 'Active Users',
                        value: userNumber,
                        change: '',
                        icon: (
                            <HiUserGroup className="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                                <thead>
                                    <tr>
                                        <th className="w-[100px]">Id</th>
                                        <th>Customer</th>
                                        <th>Company</th>
                                        <th>Teacher</th>
                                        <th>Course Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>
                                                {booking.customer.firstname}{' '}
                                                {booking.customer.lastname}
                                            </td>
                                            <td>
                                                {booking.establishment.name}
                                            </td>
                                            <td>
                                                {booking.teacher.firstname}{' '}
                                                {booking.teacher.lastname}
                                            </td>
                                            <td>
                                                {dayjs(
                                                    booking.schedule.startTime,
                                                ).format('DD/MM/YYYY')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
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
