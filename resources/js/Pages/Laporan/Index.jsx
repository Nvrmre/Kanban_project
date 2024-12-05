import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import SelectOptionInput from '@/Components/SelectOptionInput';
import NumberInput from '@/Components/NumberInput';
import PrimaryButton from '@/Components/PrimaryButton';

import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';


export default function Setting () {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-700 dark:text-gray-200">
                    Laporan
                </h2>
            }
        >
            <Head title="Laporan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                       

                   
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}