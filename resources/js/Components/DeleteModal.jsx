import { Transition } from "@headlessui/react";
import { router } from '@inertiajs/react';

export default function DeleteModal({ isOpen, onClose, onDelete, title, boardId, projectId }) {
    
        const handleDelete = () => {
            if (boardId) {
                router.visit(`/boards/${boardId}`, {
                    method: "delete",
                    preserveState: true,
                    onSuccess: () => {
                        onClose();
                        window.location.reload();
                    },
                    onError: () => {
                        console.log("Error deleting board");
                    },
                });
            } else if (projectId) {
                router.visit(`/project/${projectId}`, {
                    method: "delete",
                    preserveState: true,
                    onSuccess: () => {
                        onClose();
                        window.location.reload();
                    },
                    onError: () => {
                        console.log("Error deleting project");
                    },
                });
            }
        };
    
    
    

    if (!isOpen) return null;

    return (
        <Transition
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-black bg-opacity-30 w-screen h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <div className="mt-4">
                            <p className="text-gray-600">
                                Are you sure you want to delete this?
                            </p>
                            <div className="flex items-center justify-end mt-4">
                                <button
                                    className="text-gray-500 hover:text-gray-700 mr-4"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );

}
