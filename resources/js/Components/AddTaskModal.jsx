import React from "react";
import { FaTimes } from "react-icons/fa";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";

const AddTaskModal = ({ isOpen, onClose, boards }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        board_id: null,
        priority: "Low",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Data yang diinput:", data);
        // console.log("Data yang diinput:", data);
        post(route("task.store"), {
            onSuccess: () => {
                // Reset form after successful submission
                setData({
                    name: "",
                    description: "",
                    board_id: null,
                    priority: "Low",
                });

                onClose(); // Close the modal
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <FaTimes className="text-2xl" />
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Add a New Task
                </h2>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title:
                        </label>
                        <TextInput
                            id="title"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="priority"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Priority:
                            </label>
                            <select
                                id="priority"
                                value={data.priority}
                                onChange={(e) =>
                                    setData("priority", e.target.value)
                                }
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="board"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Board:
                            </label>
                            <select
                                id="board"
                                value={data.board_id}
                                onChange={(e) =>
                                    setData("board_id", e.target.value)
                                }
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Select Board</option>
                                {boards?.map((board) => {
                                    return (
                                        <option key={board.id} value={board.id}>
                                            {board.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description (optional):
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows="4"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
