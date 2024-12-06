import React from 'react';

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

// const dummyWeeklyProgress = [  // Dummy weekly progress data
//     { date: "2023-06-01", complete: 12, overdue: 5 },
//     { date: "2023-06-02", complete: 15, overdue: 3 },
//     { date: "2023-06-03", complete: 10, overdue: 7 },
//     { date: "2023-06-04", complete: 18, overdue: 2 },
//     { date: "2023-06-05", complete: 14, overdue: 4 },
//     { date: "2023-06-06", complete: 20, overdue: 1 },
//     { date: "2023-06-07", complete: 16, overdue: 6 },
// ];

export default function TaskReport({ taskData = { complete: 0, overdue: 0 }, weeklyProgress = [] }) {
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-xl font-semibold text-blue-700 mb-4">Task Status</h2>
                            <TaskChart data={taskData} />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-xl font-semibold text-blue-700 mb-4">Task Distribution</h2>
                            <TaskPieChart data={dummyTaskData} />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <PrimaryButton className='flex text-sm'>
                            <FaFileDownload/><p className='ml-2'>Download Report</p>
                        </PrimaryButton>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
