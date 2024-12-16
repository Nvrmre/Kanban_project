
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import DeleteModal from "@/Components/DeleteModal";

import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { Head, Link, useForm, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Textarea } from "@headlessui/react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import Pagination from "@/Components/Pagination";

export default function Dashboard({ projects, session }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(projects.meta.current_page);

    const alert = StatusAlertService;
    console.log("projects:", projects);
    const showSuccessAlert = (msg) => {
        alert.showSuccess(msg);
    };

    const showErrorAlert = (msg) => {
        alert.showError(msg);
    };

    const openDeleteModal = (id) => {
        setCurrentProjectId(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const { data, setData, post, processing, errors } = useForm({
        name: "", // Initial value for project name
        description: "", // Initial value for project description
    });

    const handleCreateOrEditProject = (e) => {
        e.preventDefault();
        if (isEditing) {
            router.visit(`/project/${currentProjectId}`, {
                method: "put",
                preserveState: true,
                onSuccess: () => {
                    setData({ name: "", description: "" });
                    setIsEditing(false);
                    showSuccessAlert("Project updated successfully");
                },
                onError: () => {
                    showErrorAlert("Failed to update project");
                },
            });
        } else {
            post("/project", {
                onSuccess: () => {
                    setData({ name: "", description: "" });
                    showSuccessAlert("Project created successfully");
                },
                onError: () => {
                    showErrorAlert("Failed to create project");
                },
            });
        }
    };

    const handleEdit = (project) => {
        setData({ name: project.name, description: project.description });
        setCurrentProjectId(project.id);
        setIsEditing(true);
    };

    const handleDelete = () => {
        router.visit("/project/" + currentProjectId, {
            method: "delete",
            preserveState: true,
            onSuccess: (res) => {
                closeDeleteModal();
                showSuccessAlert("Project deleted successfully");
            },
            onError: (errors) => {
                showErrorAlert("Error delete failed");
            },
        });
    };

    const handlePageChange = (page) => {
        router.visit(`/dashboard?page=${page}`, {
            preserveState: true,
            onSuccess: () => {
                setCurrentPage(page);
            },
        });
    };

    return (
        <>
            <StatusAlert />
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-extrabold leading-tight text-blue-600 dark:text-gray-200">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />
                <div className="py-6 md:py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                        {/* Form Input for Project Name */}
                        <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg p-6 hover:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition duration-150 ease-in-out">
                            <h3 className="text-lg font-bold text-blue-600 ">
                                {isEditing ? "Edit Project" : "Create Project"}
                            </h3>
                            <form
                                onSubmit={handleCreateOrEditProject}
                                className="mt-4"
                            >
                                <div className="mb-4">
                                    <InputLabel>Project Name</InputLabel>
                                    <TextInput
                                        placeholder="Enter Project name"
                                        className="w-full border border-gray-300 rounded-md"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
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
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value.substring(0, 30)
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing
                                        ? isEditing
                                            ? "Updating..."
                                            : "Creating..."
                                        : isEditing
                                        ? "Update"
                                        : "Create"}
                                </PrimaryButton>
                                {isEditing && (
                                    <PrimaryButton
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            reset();
                                        }}
                                        className="ml-2 text-gray-600"
                                    >
                                        Cancel
                                    </PrimaryButton>
                                )}
                            </form>
                        </div>

                        {/* Display Projects */}
                        <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg p-6 hover:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition duration-150 ease-in-out">
                            <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">
                                Your Projects
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {projects?.data?.map((project) => (
                                    <div
                                        key={project.id}
                                        className="relative block p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200"
                                    >
                                        <div className="flex w-full items-start">
                                            <Link
                                                href={`/kanban/${project.id}`}
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
                                                            {project.created_at}
                                                        </p>
                                                        <p>
                                                            Date Updated:{" "}
                                                            {project.updated_at}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        Click to view
                                                    </p>
                                                </div>
                                            </Link>

                                            <div className="ml-2 flex-shrink-0">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(project)
                                                    }
                                                    className="mr-2"
                                                >
                                                    <FaEdit className="text-blue-500 hover:text-blue-700" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            project.id
                                                        )
                                                    }
                                                >
                                                    <FaRegTrashAlt className="text-red-500 hover:text-red-700" />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <Pagination
                                    currentPage={projects.meta.current_page}
                                    lastPage={projects.meta.last_page}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                    title="Delete Project"
                />
            </AuthenticatedLayout>
        </>

    );
};

export default Dashboard;
