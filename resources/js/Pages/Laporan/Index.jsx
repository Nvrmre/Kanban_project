import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import TaskChart from '@/Components/TaskChart';
import TaskPieChart from '@/Components/TaskPieChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaFileDownload } from "react-icons/fa";
import PrimaryButton from '@/Components/PrimaryButton';

import { Head, usePage } from '@inertiajs/react';


// TaskReport Component
export default function TaskReport() {
    // Mengakses props yang dikirimkan oleh Inertia
    const { taskData } = usePage().props;  // Akses taskData yang sudah dikirim

    // Menyiapkan data untuk chart (misalnya untuk Task Status)
    const taskStatusData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: 'Task Status',
                data: [
                    taskData.to_do,           // Data 'to_do' dari backend
                    taskData.in_progress,     // Data 'in_progress' dari backend
                    taskData.complete         // Data 'complete' dari backend
                ],
                backgroundColor: ['#f39c12', '#e74c3c', '#2ecc71'],
                borderColor: ['#f39c12', '#e74c3c', '#2ecc71'],
                borderWidth: 1
            }
        ]
    };

    const taskDistributionData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [taskData.complete, taskData.to_do + taskData.in_progress],
                backgroundColor: ['#2ecc71', '#e74c3c'],
                borderColor: ['#2ecc71', '#e74c3c'],
                borderWidth: 1
            }
        ]
    };

    const chartRef = useRef(null);
    const pieChartRef = useRef(null);

    // Function to download a specific chart
    const downloadChart = async (chartRef, fileName) => {
        if (!chartRef.current) return;
    
        // Simpan style asli untuk shadow
        const originalBoxShadow = chartRef.current.style.boxShadow;
    
        // Hapus shadow sebelum render
        chartRef.current.style.boxShadow = 'none';
    
        // Render elemen menjadi canvas
        const canvas = await html2canvas(chartRef.current);
    
        // Pulihkan shadow setelah render
        chartRef.current.style.boxShadow = originalBoxShadow;
    
        // Simpan sebagai gambar
        canvas.toBlob((blob) => {
            saveAs(blob, `${fileName}.png`);
        });
    };
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-extrabold leading-tight text-blue-600">
                    Laporan
                </h2>
            }
        >
            <Head title="Laporan" />

            <div className="container mx-auto p-4">
            <h2 className="text-3xl font-extrabold leading-tight text-blue-600 mb-6">Task Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Status Chart */}
                <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Task Status</h3>
                    <TaskChart data={taskStatusData} />
                    <PrimaryButton onClick={() => downloadChart(chartRef, 'task_status')} className="mt-4">
                        <FaFileDownload />
                        Download Task Status Chart
                    </PrimaryButton>
                </div>

                {/* Task Distribution Chart */}
                <div ref={pieChartRef} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Task Distribution</h3>
                    <TaskPieChart data={taskDistributionData} />
                    <PrimaryButton onClick={() => downloadChart(pieChartRef, 'task_distribution')} className="mt-4">
                        <FaFileDownload />
                        Download Task Distribution Chart
                    </PrimaryButton>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}