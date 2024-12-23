import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react"; // Mengakses data dari Inertia
import Chart from "chart.js/auto";

// export default function TaskReport() {
//     // Mengakses data yang dikirim dari backend melalui Inertia
//     const { taskData } = usePage().props;

//     // Menyiapkan data untuk chart (misalnya untuk Task Status)
//     const taskStatuses = [];
//     for (let i = 1; i <= 31; i++) {
//         taskStatuses.push(i.toString());
//     }

//     // Data jumlah task yang sudah selesai setiap hari
//     const taskValues = [];
//     for (let i = 1; i <= 31; i++) {
//         taskValues.push(taskData[`complete_day_${i}`] ?? 0);
//     }

export default function TaskReport() {
    // Mengakses data yang dikirim dari backend melalui Inertia
    const { taskData } = usePage().props;

    // Menyiapkan data untuk chart (misalnya untuk Task Status)
    const taskStatuses = ["Complete"];
    // const taskStatuses = ["Complete", "To Do", "In Progress"];
    const taskValues = [
        taskData.complete ?? 0, // Menggunakan nilai dari backend, atau 0 jika tidak ada
        // taskData.to_do ?? 0,
        // taskData.in_progress ?? 0,
    ];

    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(2); // Menyesuaikan aspek rasio grafik

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            setAspectRatio(2); // Lebih besar untuk desktop
        } else if (screenWidth >= 640) {
            setAspectRatio(1); // Ukuran menengah untuk tablet
        } else {
            setAspectRatio(1); // Ukuran kecil untuk mobile
        }
    };

    useEffect(() => {
        handleResize(); // Menyesuaikan aspek rasio saat resize
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy(); // Menghancurkan chart sebelumnya
                }

                chartInstance.current = new Chart(ctx, {
                    type: "bar", // Menggunakan grafik batang untuk task status
                    data: {
                        labels: taskStatuses, // Menampilkan status tugas
                        datasets: [
                            {
                                label: "Task Complete",
                                data: taskValues, // Data status tugas
                                backgroundColor: [
                                    "rgba(34, 197, 94, 0.6)", // In Progress/ Complete
                                ],
                                borderColor: ["rgba(34, 197, 94, 1)"],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true, // Responsif untuk ukuran layar
                        aspectRatio: aspectRatio, // Menyesuaikan aspek rasio grafik
                        plugins: {
                            legend: { display: true },
                            title: {
                                display: true,
                                text: "Task Complete Overview",
                            },
                        },
                        scales: {
                            x: { title: { display: true, text: "Day" } },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: "Number of Tasks",
                                },
                            },
                        },
                    },
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Membersihkan chart saat komponen di-unmount
            }
        };
    }, [taskValues, aspectRatio]);

    return (
        <div className="container mx-auto p-4">
            {/* Chart Container */}
            <canvas ref={chartRef} />
        </div>
    );
}
