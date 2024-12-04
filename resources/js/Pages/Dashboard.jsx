import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import DeleteModal from "@/Components/DeleteModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { Head, Link} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Textarea } from "@headlessui/react";

export default function Dashboard() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projects, setProjects] = useState([]); // State to hold projects
    const [projectTitle, setProjectTitle] = useState(""); // State for project title input
    const [projectDescription, setProjectDescription] = useState(""); // State for project description input

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    
    const handleCreateProject = (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (projectTitle.trim() !== "" && projectDescription.trim() !== "") {
            const newProject = {
                title: projectTitle,
                description: projectDescription,
                dateAdded: new Date().toLocaleString(), // Current date and time
                dateUpdated: new Date().toLocaleString() // Current date and time
            };
            setProjects([...projects, newProject]); // Add new project to the list
            setProjectTitle(""); // Clear the input field
            setProjectDescription(""); // Clear the description field   
        }
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
                    {/* Form Input for Board Title */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">
                            Create Project
                        </h3>
                        <form onSubmit={handleCreateProject}  className="mt-4">
                            <div className="mb-4">
                                <InputLabel> Project Title</InputLabel>
                                    <TextInput 
                                        placeholder="Enter Project title" 
                                        className="w-full border border-gray-300 rounded-md"
                                        value={projectTitle} // Bind the input value to projectTitle state
                                        onChange={(e) => setProjectTitle(e.target.value)} // Update projectTitle state on change
                                    />
                            </div>
                            <div className="mb-4">
                                <InputLabel> Project Description</InputLabel>
                                    <Textarea 
                                        placeholder="Enter Project description max 30 characters" 
                                        className="w-full border border-gray-300 rounded-md"
                                        value={projectDescription} // Bind the input value to projectDescription state
                                        onChange={(e) => setProjectDescription(e.target.value.substring(0, 30))} // Update projectDescription state on change and limit to 40 characters
                                    />
                            </div>
                            <PrimaryButton className="" type="submit">Create</PrimaryButton>
                        </form>
                    </div>

                    {/* Display Boards */}
                    <div className="overflow-hidden bg-blue-100 shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-gray-300">
                            Your Project
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {projects.map((project, index) => (
                                <div key={index} className="relative block p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-200 ">
                                    <div className="flex w-full items-start">
                                        <Link href={`/kanban/${project.title.replace(/\s+/g, '-').toLowerCase()}`} className="flex-grow">
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-bold text-blue-700 font-medium">
                                                    {project.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 truncate max-w-full">
                                                    {project.description}
                                                </p>
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <p>Date Added: {project.dateAdded}</p>
                                                    <p>Date Updated: {project.dateUpdated}</p>
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
                title="Delete Board"
            />
        </AuthenticatedLayout>
    );
}
