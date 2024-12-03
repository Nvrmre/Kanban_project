import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import SelectOptionInput from '@/Components/SelectOptionInput';
import NumberInput from '@/Components/NumberInput';
import PrimaryButton from '@/Components/PrimaryButton';

import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

// import DeleteUserForm from './Partials/DeleteUserForm';
// import UpdatePasswordForm from './Partials/UpdatePasswordForm';
// import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Setting () {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm({
        // password: '',
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-700 dark:text-gray-200">
                    Setting
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Role Information
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Account profile role information. 
                        </p>
                            <form className="mt-6 space-y-6">
                                <div>
                                <InputLabel htmlFor="role" value="Role : " />

                                <SelectOptionInput
                                    id="role"
                                    className="mt-1 block w-full"
                                    // value={data.name}
                                    // onChange={(e) => setData('role', e.target.value)}
                                    // required
                                    // isFocused
                                    // autoComplete="role"
                                />
                                </div>
                                

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Notification
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Account profile Notification duration. 
                        </p>
                            <form className="mt-6 space-y-6">
                                <div>
                                <InputLabel htmlFor="durasi" value="Notification Duration : " />

                                <NumberInput
                                    id="durasi"
                                    className="mt-1 block w-full"
                                    // value={data.name}
                                    // onChange={(e) => setData('role', e.target.value)}
                                    // required
                                    // isFocused
                                    // autoComplete="durasi"
                                />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}