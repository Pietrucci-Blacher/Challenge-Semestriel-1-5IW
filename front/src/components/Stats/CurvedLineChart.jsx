import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function CurvedlineChart({ chartData, chartOptions, className, ...props }) {
    const defaultData = {
        labels: [],
        datasets: [],
    };

    const defaultOptions = {
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

    const data = chartData || defaultData;
    const options = chartOptions || defaultOptions;

    return (
        <div className={className}>
            <Line data={data} options={options} {...props} />
        </div>
    );
}

CurvedlineChart.propTypes = {
    chartData: PropTypes.object,
    chartOptions: PropTypes.object,
    className: PropTypes.string,
};

export default CurvedlineChart;
