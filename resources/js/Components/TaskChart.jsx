import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import Chart from "chart.js/auto";

export default function TaskReport() {
    const { dailyData } = usePage().props; // Data dari backend

    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(2);

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        setAspectRatio(screenWidth >= 1024 ? 2 : screenWidth >= 640 ? 1.5 : 1);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Array.from({ length: 30 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (30 - i - 1));
                        return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                    }), // Label untuk 30 hari terakhir
                    datasets: [
                        {
                            label: "Tasks Completed",
                            data: Object.values(dailyData), // Data jumlah tugas selesai
                            backgroundColor: "rgba(34, 197, 94, 0.6)",
                            borderColor: "rgba(34, 197, 94, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    aspectRatio,
                    plugins: {
                        legend: { display: true },
                        title: {
                            display: true,
                            text: "Task Completion Over 30 Days",
                        },
                    },
                    scales: {
                        x: { title: { display: true, text: "Date" } },
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: "Number of Tasks" },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [dailyData, aspectRatio]);

    return (
        <div className="container mx-auto p-4">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
