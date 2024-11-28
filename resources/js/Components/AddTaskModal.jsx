import React, { useState } from "react";

const AddTaskModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Low");
    const [column, setColumn] = useState("Backlog");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            {/* Modal Container */}
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>

                {/* Modal Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Add a New Task
                </h2>

                {/* Form */}
                <form className="space-y-4">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Priority and Column */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Priority */}
                        <div>
                            <label
                                htmlFor="priority"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Priority:
                            </label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        {/* Column */}
                        <div>
                            <label
                                htmlFor="column"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Select a column:
                            </label>
                            <select
                                id="column"
                                value={column}
                                onChange={(e) => setColumn(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="Backlog">Backlog</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description (optional):
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
                        onClick={() => {
                            console.log({
                                title,
                                priority,
                                column,
                                description,
                            });
                        }}
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
