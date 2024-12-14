import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import DeleteModal from "@/Components/DeleteModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { Head, Link, useForm } from "@inertiajs/react"; 
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Textarea } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projects, setProjects] = useState([]); 
   

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

   
    const { data, setData, post, processing, errors } = useForm({
        name: '', // Initial value for project name
        description: '', // Initial value for project description
    });
    
    const handleCreateProject = (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        // Mengirimkan data ke backend
        post("/project", {
            onSuccess: (response) => {
                // Reset form setelah berhasil
                setData("name", "");
                setData("description", "");
    
                // Menambahkan proyek baru ke daftar proyek yang ditampilkan
                setProjects((prevProjects) => [...prevProjects, response.props.project]);
            },
        });
    };
    

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
                    {/* Form Input for Project Name */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">
                            Create Project
                        </h3>
                        <form onSubmit={handleCreateProject} className="mt-4">
                            <div className="mb-4">
                                <InputLabel>Project Name</InputLabel>
                                <TextInput
                                    placeholder="Enter Project name"
                                    className="w-full border border-gray-300 rounded-md"
                                    value={data.name} // Bind the input value to projectName state
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    } // Update projectName state on change
                                />
                                {errors.name && (
                                    <p className="text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <InputLabel>Project Description</InputLabel>
                                <Textarea
                                    placeholder="Enter Project description max 30 characters"
                                    className="w-full border border-gray-300 rounded-md"
                                    value={data.description} // Bind the input value to projectDescription state
                                    onChange={(e) =>
                                        setData(
                                            "description",
                                            e.target.value.substring(0, 30)
                                        )
                                    } // Update projectDescription state on change and limit to 40 characters
                                />
                                {errors.description && (
                                    <p className="text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                            <PrimaryButton
                                className=""
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? "Creating..." : "Create"}
                            </PrimaryButton>
                        </form>
                    </div>

                    {/* Display Projects */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">
                            Your Projects
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="relative block p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200 "
                                >
                                    <div className="flex w-full items-start">
                                        <Link
                                            href={`/board/${project.name
                                                .replace(/\s+/g, "-")
                                                .toLowerCase()}`} // Menggunakan 'name' untuk URL
                                            className="flex-grow"
                                        >
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-bold text-blue-700 font-medium">
                                                    {project.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 truncate max-w-full">
                                                    {project.description}
                                                </p>
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <p>
                                                        Date Added:{" "}
                                                        {project.dateAdded}
                                                    </p>
                                                    <p>
                                                        Date Updated:{" "}
                                                        {project.dateUpdated}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Click to view
                                                </p>
                                            </div>
                                        </Link>

                                        <div className="ml-2 flex-shrink-0">
                                            <button>
                                                <FaRegTrashAlt
                                                    onClick={openDeleteModal}
                                                    className="text-red-500 hover:text-red-700"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                title="Delete Project"
            />
        </AuthenticatedLayout>
    );
}
