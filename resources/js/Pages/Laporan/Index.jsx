import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import TaskChart from '@/Components/TaskChart';
import TaskPieChart from '@/Components/TaskPieChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaFileDownload } from "react-icons/fa";
import PrimaryButton from '@/Components/PrimaryButton';

import { Head } from '@inertiajs/react';

// Default dummy data to prevent undefined errors
const dummyTaskData = {
    complete: 75,
    overdue: 30,
};

export default function TaskReport({ taskData = { complete: 0, overdue: 0 }, weeklyProgress = [] }) {
    // Refs to chart elements
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

            <div className="bg-gray-100">   
                <main className="container mx-auto px-4 py-8">
                    {/* Task Status Chart */}
                    <div ref={chartRef} className="h-auto mb-4 w-full bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-xl font-semibold text-blue-700 mb-4">Task Status</h2>
                        <TaskChart data={taskData} />
                    </div>

                    {/* Task Distribution Chart */}
                    <div ref={pieChartRef} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-xl font-semibold text-blue-700 mb-4">Task Distribution</h2>
                        <TaskPieChart data={dummyTaskData} />
                    </div>

                    {/* Download Buttons */}
                    <div className="flex justify-end mt-4 gap-4">
                        <PrimaryButton
                            className="flex text-sm"
                            onClick={() => downloadChart(chartRef, 'Task_Status_Chart')}
                        >
                            <FaFileDownload />
                            <p className="ml-2">Download Task Status Chart</p>
                        </PrimaryButton>

                        <PrimaryButton
                            className="flex text-sm"
                            onClick={() => downloadChart(pieChartRef, 'Task_Distribution_Chart')}
                        >
                            <FaFileDownload />
                            <p className="ml-2">Download Task Distribution Chart</p>
                        </PrimaryButton>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
