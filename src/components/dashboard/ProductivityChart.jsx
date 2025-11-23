import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ProductivityChart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ProductivityChart = () => {
    const { tasks } = useApp();
    const [period, setPeriod] = useState('week');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const calculateData = () => {
            // In a real app, we would filter tasks based on completion date
            // For now, we'll use the mock logic but formatted for Chart.js

            let labels = [];
            let dataPoints = [];

            if (period === 'week') {
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                dataPoints = [3, 5, 2, 8, 6, 4, 7];
            } else if (period === 'month') {
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                dataPoints = [15, 20, 18, 22];
            } else {
                labels = ['Morning', 'Afternoon', 'Evening'];
                dataPoints = [2, 5, 3];
            }

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Tasks Completed',
                        data: dataPoints,
                        backgroundColor: '#6c63ff', // Primary color
                        borderRadius: 6,
                        hoverBackgroundColor: '#5a52d5',
                        barThickness: 'flex',
                        maxBarThickness: 40,
                    },
                ],
            });
        };

        calculateData();
    }, [period, tasks]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#263238',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return `${context.raw} Tasks`;
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 11,
                    },
                    color: '#636e72',
                    stepSize: 1,
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 11,
                    },
                    color: '#636e72',
                }
            }
        },
        animation: {
            duration: 750,
            easing: 'easeInOutQuart',
        },
    };

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h3>Daily Productivity</h3>
                <select
                    id="productivityFilter"
                    className="productivity-filter"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
            </div>
            <div className="chart-container-js" style={{ height: '200px', width: '100%' }}>
                <Bar options={options} data={chartData} />
            </div>
        </div>
    );
};

export default ProductivityChart;
