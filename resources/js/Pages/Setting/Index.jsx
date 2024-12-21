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
                <h2 className="text-xl font-semibold leading-tight text-blue-700 ">
                    Setting
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="grid grid-cols-2 gap-6 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 hover:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition duration-150 ease-in-out">
                        <h2 className="text-lg font-medium text-gray-900 ">
                            Role Information
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 ">
                            Account profile role information. 
                        </p>
                            <form className="mt-6 space-y-6">
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
                                

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 ">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 hover:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition duration-150 ease-in-out">
                        <h2 className="text-lg font-medium text-gray-900 ">
                            Notification
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 ">
                            Account profile Notification duration. 
                        </p>
                            <form className="mt-6 space-y-6">
                                <InputLabel value="Notification Duration :" className="text-sm font-medium text-gray-700" />
                                <select
                                    className="w-25 border border-gray-300 rounded pe-7"
                                    // value={task.notificationDuration || "6"}
                                    // onChange={(e) => (task.notificationDuration = e.target.value)}
                                >
                                    <option value="">6 hours</option>
                                    <option value="">12 hours</option>
                                    <option value="">1 day</option>
                                    <option value="">3 days</option>
                                    <option value="">5 days</option>
                                    <option value="">7 days</option>
                                </select>
                                

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 ">
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