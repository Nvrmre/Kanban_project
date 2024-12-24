import React from "react";
import { FaTimes } from "react-icons/fa";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const AddTaskModal = ({ isOpen, onClose, boards, onTaskCreated }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        board_id: boards[0]?.id || "", // Get first board ID or empty string
        priority: "low",
        status: "to_do",
        due_date: "",
        notification_duration: "1 day",
        assigned_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("task.store"), {
            onSuccess: (response) => {
                console.log("Complete task data:", data);
                // Pass the complete form data including board_id
                onTaskCreated({
                    id: Date.now(), // Temporary ID for new task
                    name: data.name,
                    board_id: data.board_id,
                    priority: data.priority,
                    status: data.status,
                    description: data.description,
                    due_date: data.due_date,
                });
                onClose();
            },
            onError: (errors) => {
                console.log("Validation errors:", errors);
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title:
                        </label>
                        <TextInput
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <InputError message={errors.name} />
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
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <InputError message={errors.priority} />
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Status:
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="to_do">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <InputError message={errors.status} />
                        </div>
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
                            {boards.map((board) => (
                                <option key={board.id} value={board.id}>
                                    {board.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.board_id} />
                    </div>

                    <div>
                        <label
                            htmlFor="due_date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Due Date:
                        </label>
                        <input
                            type="date"
                            id="due_date"
                            value={data.due_date}
                            onChange={(e) =>
                                setData("due_date", e.target.value)
                            }
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <InputError message={errors.due_date} />
                    </div>

                    <div>
                        <label
                            htmlFor="notification_duration"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Notification Duration:
                        </label>
                        <select
                            id="notification_duration"
                            value={data.notification_duration}
                            onChange={(e) =>
                                setData("notification_duration", e.target.value)
                            }
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="6 hours">6 hours</option>
                            <option value="12 hours">12 hours</option>
                            <option value="1 day">1 day</option>
                            <option value="3 days">3 days</option>
                            <option value="5 days">5 days</option>
                            <option value="7 days">7 days</option>
                        </select>
                        <InputError message={errors.notification_duration} />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description:
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows="4"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <PrimaryButton
                        type="submit"
                        className="w-full justify-center text-white py-2 px-4 rounded 0 transition"
                    >
                        Add Task
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
