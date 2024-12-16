import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import DeleteModal from '@/Components/DeleteModal';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Dashboard = ({ projects: initialProjects }) => {
    const [projects, setProjects] = useState(initialProjects);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleCreateProject = (e) => {
        e.preventDefault();
        post('/project', {
            onSuccess: ({ props }) => {
                setProjects([...projects, props.project]);
                setData({ name: '', description: '' });
            },
        });
    };

    const openDeleteModal = (project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDeleteProject = () => {
        if (selectedProject) {
            Inertia.delete(`/project/${selectedProject.id}`, {
                onSuccess: () => {
                    setProjects(projects.filter((p) => p.id !== selectedProject.id));
                    closeDeleteModal();
                },
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-extrabold leading-tight text-blue-600 dark:text-gray-200">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Form Input for Project Name */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">Create Project</h3>
                        <form onSubmit={handleCreateProject} className="mt-4">
                            <div className="mb-4">
                                <InputLabel>Project Name</InputLabel>
                                <TextInput
                                    placeholder="Enter Project name"
                                    className="w-full border border-gray-300 rounded-md"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-red-500">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <InputLabel>Project Description</InputLabel>
                                <TextInput
                                    placeholder="Enter Project description max 30 characters"
                                    className="w-full border border-gray-300 rounded-md"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value.substring(0, 30))
                                    }
                                />
                                {errors.description && <p className="text-red-500">{errors.description}</p>}
                            </div>
                            <PrimaryButton className="" type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create'}
                            </PrimaryButton>
                        </form>
                    </div>

                    {/* Display Projects */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">Your Projects</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="relative block p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200"
                                >
                                    <div className="flex w-full items-start">
                                        <Link
                                            href={`/project/${project.id}`}
                                            className="flex-grow"
                                        >
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-bold text-blue-700">{project.name}</h4>
                                                <p className="text-sm text-gray-600 truncate max-w-full">{project.description}</p>
                                                <p className="text-sm text-gray-600">Click to view</p>
                                            </div>
                                        </Link>
                                        <div className="ml-2 flex-shrink-0">
                                            <button onClick={() => openDeleteModal(project)}>
                                                <FaRegTrashAlt className="text-red-500 hover:text-red-700" />
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
                onDelete={handleDeleteProject}
                title={`Delete Project: ${selectedProject?.name || 'Unnamed'}`}
            >
                Are you sure you want to delete this project?
            </DeleteModal>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
