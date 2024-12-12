import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const dummyWeeklyProgress = [  // Dummy weekly progress data
    { date: "2023-06-01", complete: 12, overdue: 5 },
    { date: "2023-06-02", complete: 15, overdue: 3 },
    { date: "2023-06-03", complete: 10, overdue: 7 },
    { date: "2023-06-04", complete: 18, overdue: 2 },
    { date: "2023-06-05", complete: 14, overdue: 4 },
    { date: "2023-06-06", complete: 20, overdue: 1 },
    { date: "2023-06-07", complete: 16, overdue: 6 },
];

export default function TaskChart({ data }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Jika data dari props tidak ada, gunakan dummy data
    const safeData = {
        complete: data?.complete ?? dummyTaskData.complete,
        overdue: data?.overdue ?? dummyTaskData.overdue,
    };

    // Menyiapkan data progres mingguan
    const safeWeeklyProgress = data?.weeklyProgress ?? dummyWeeklyProgress;
    const weeklyDates = safeWeeklyProgress.map(item => item.date);
    const weeklyComplete = safeWeeklyProgress.map(item => item.complete);
    const weeklyOverdue = safeWeeklyProgress.map(item => item.overdue);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Hancurkan instance sebelumnya untuk mencegah duplikasi
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                // Inisialisasi chart baru
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Complete', 'Overdue'],
                        datasets: [
                            {
                                data: [safeData.complete, safeData.overdue],
                                backgroundColor: ['rgba(37, 99, 235, 0.8)', 'rgba(239, 68, 68, 0.8)'],
                                borderColor: ['rgba(37, 99, 235, 1)', 'rgba(239, 68, 68, 1)'],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            title: { display: true, text: 'Task Status' },
                        },
                        scales: {
                            y: { beginAtZero: true, title: { display: true, text: 'Number of Tasks' } },
                        },
                    },
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [safeData]);

    // Weekly progress chart
    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: weeklyDates,
                        datasets: [
                            {
                                label: 'Complete',
                                data: weeklyComplete,
                                borderColor: 'rgba(37, 99, 235, 1)',
                                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                                fill: true,
                            },
                            {
                                label: 'Overdue',
                                data: weeklyOverdue,
                                borderColor: 'rgba(239, 68, 68, 1)',
                                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                fill: true,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: true },
                            title: { display: true, text: 'Weekly Task Progress' },
                        },
                        scales: {
                            x: { title: { display: true, text: 'Date' } },
                            y: { beginAtZero: true, title: { display: true, text: 'Number of Tasks' } },
                        },
                    },
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [safeWeeklyProgress]);

    return <canvas ref={chartRef} />;
}
