import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import SelectOptionInput from "@/Components/SelectOptionInput";
import NumberInput from "@/Components/NumberInput";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { BsPersonFillAdd } from "react-icons/bs";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState, useEffect, useRef } from "react";

export default function Setting() {
    const dropdownRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { auth, users } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        recentlySuccessful,
    } = useForm({
        email: "",
        role: "user",
        notification_duration: "6",
    });

    const handleEmailSearch = (value) => {
        setSearchTerm(value);
        const filtered = users.filter((user) =>
            user.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
        setShowDropdown(true);
    };

    const selectUser = (user) => {
        setData("email", user.email);
        setSearchTerm(user.email);
        setShowDropdown(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleNotificationSubmit = (e) => {
        e.preventDefault();
        post(route("settings.notification.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);
    // Add this right after your usePage() call
    console.log("Full props:", users);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-700">
                    Setting
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="grid grid-cols-2 gap-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 hover:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition duration-150 ease-in-out">
                        <h2 className="text-lg font-medium text-gray-900">
                            User Role Management
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage user roles and permissions.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            <InputLabel
                                value="User Roles :"
                                className="text-sm font-medium text-gray-700"
                            />

                            <div className="flex flex-row space-x-1">
                                <select
                                    className="block w-4/5 p-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                >
                                    <option value="">Select User Email</option>
                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.email}
                                        >
                                            {user.email} - {user.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="block w-1/5 p-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                >
                                    <option value="developer">Developer</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            {errors.email && (
                                <div className="text-red-500 text-sm">
                                    {errors.email}
                                </div>
                            )}
                            <PrimaryButton
                                className="w-auto justify-center"
                                type="submit"
                                disabled={processing}
                            >
                                Save
                            </PrimaryButton>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-green-600">
                                    Saved successfully.
                                </p>
                            </Transition>
                        </form>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 hover:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition duration-150 ease-in-out">
                        <h2 className="text-lg font-medium text-gray-900">
                            Notification Settings
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Configure notification duration preferences.
                        </p>
                        <form
                            onSubmit={handleNotificationSubmit}
                            className="mt-6 space-y-6"
                        >
                            <InputLabel
                                value="Notification Duration :"
                                className="text-sm font-medium text-gray-700"
                            />
                            <select
                                className="w-25 border border-gray-300 rounded pe-7"
                                value={data.notification_duration}
                                onChange={(e) =>
                                    setData(
                                        "notification_duration",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="6">6 hours</option>
                                <option value="12">12 hours</option>
                                <option value="24">1 day</option>
                                <option value="72">3 days</option>
                                <option value="120">5 days</option>
                                <option value="168">7 days</option>
                            </select>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600">
                                        Saved successfully.
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
