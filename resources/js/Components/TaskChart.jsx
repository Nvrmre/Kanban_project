import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const dummyTaskData = {
    complete: 0,
    overdue: 0,
};

const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
const daysInMonth = lastDayOfMonth.getDate();

const dummyWeeklyProgress = [...Array(daysInMonth)].map((_, i) => {
    const date = new Date(firstDayOfMonth.getTime());
    date.setDate(i + 1);
    return {
        date: date.toISOString().slice(0, 10),
        complete: Math.floor(Math.random() * 20) + 1,
        overdue: Math.floor(Math.random() * 10) + 1,
    };
});

export default function TaskChart({ data }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(2); 

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) { 
            setAspectRatio(2);
        } else if (screenWidth >= 640) { 
            setAspectRatio(1);
        } else {
            setAspectRatio(1); 
        }
    };

    useEffect(() => {
        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const safeData = {
        complete: data?.complete ?? dummyTaskData.complete,
        overdue: data?.overdue ?? dummyTaskData.overdue,    
    };

    const safeWeeklyProgress = data?.weeklyProgress ?? dummyWeeklyProgress;
    const weeklyDates = safeWeeklyProgress.map(item => item.date);
    const weeklyComplete = safeWeeklyProgress.map(item => item.complete);
    const weeklyOverdue = safeWeeklyProgress.map(item => item.overdue);

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
                        aspectRatio: aspectRatio, 
                        plugins: {
                            legend: { display: true },
                            title: { display: true, text: 'Monthly Task Progress' },
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
    }, [safeWeeklyProgress, aspectRatio]); 

    return (
        <canvas ref={chartRef} />
    );
}
