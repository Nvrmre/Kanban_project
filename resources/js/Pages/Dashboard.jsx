import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import DeleteModal from "@/Components/DeleteModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { Head, Link} from "@inertiajs/react";

export default function Dashboard() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-extrabold leading-tight text-blue-600 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Form Input for Board Title */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">
                            Create Board
                        </h3>
                        <form className="mt-4">
                            <input
                                type="text"
                                placeholder="Enter board title"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </form>
                    </div>

                    {/* Display Boards */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">
                            Your Boards
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            <div className="relative block p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600">
                                <Link href="/kanban/Index">
                                    <h4 className="text-lg font-bold text-blue-700 font-medium">
                                        Sample Board
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Click to view
                                    </p>
                                </Link>
                                <button
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    onClick={openDeleteModal}
                                >
                                    <FaRegTrashAlt className="text-lg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={() => {
                    closeDeleteModal();
                }}
                title="Delete Board"
            />
        </AuthenticatedLayout>
    );
}
