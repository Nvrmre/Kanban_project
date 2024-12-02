import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteModal from "@/Components/DeleteModal";

const TaskModal = ({ isOpen, onClose, task }) => {
    // Add a guard clause if task is null
    if (!isOpen || !task) return null;

    const [checklist, setChecklist] = useState(task.checklist || []);
    const [newTask, setNewTask] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Handle the drag-and-drop logic
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedChecklist = Array.from(checklist);
        const [movedItem] = updatedChecklist.splice(result.source.index, 1);
        updatedChecklist.splice(result.destination.index, 0, movedItem);

        setChecklist(updatedChecklist);
    };

    // Add a new checklist item
    const addChecklistItem = (e) => {
        if (e.key === "Enter" && newTask.trim() !== "") {
            setChecklist([...checklist, { text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    // Toggle completion of a checklist item
    const toggleComplete = (index) => {
        const updatedChecklist = [...checklist];
        updatedChecklist[index].completed = !updatedChecklist[index].completed;
        setChecklist(updatedChecklist);
    };

    // Delete a checklist item
    const deleteItem = (index) => {
        const updatedChecklist = checklist.filter((_, i) => i !== index);
        setChecklist(updatedChecklist);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>

                {/* Modal Content */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            TITLE:
                        </h2>
                        <p className="text-xl font-bold text-gray-900 mt-1">
                            {task.title}
                        </p>
                    </div>

                    {/* Checklist */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            CHECKLIST:
                        </h2>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="checklist">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="mt-2 space-y-2"
                                    >
                                        {checklist.map((item, index) => (
                                            <Draggable
                                                key={index}
                                                draggableId={`item-${index}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex items-center justify-between bg-gray-100 p-2 rounded cursor-move"
                                                    >
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    item.completed
                                                                }
                                                                onChange={() =>
                                                                    toggleComplete(
                                                                        index
                                                                    )
                                                                }
                                                                className="mr-2"
                                                            />
                                                            <span
                                                                className={
                                                                    item.completed
                                                                        ? "line-through text-gray-500"
                                                                        : ""
                                                                }
                                                            >
                                                                {item.text}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                deleteItem(
                                                                    index
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            ✖
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <input
                            type="text"
                            placeholder="Add a sub task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={addChecklistItem}
                            className="w-full border border-gray-300 rounded p-2 mt-2"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            DESCRIPTION:
                        </h2>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 mt-1"
                            rows="3"
                            defaultValue={task.description}
                        ></textarea>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">
                                PRIORITY:
                            </h2>
                            <select
                                defaultValue={task.priority}
                                className="w-full border border-gray-300 rounded p-2 mt-1"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">
                                STATUS:
                            </h2>
                            <span className="inline-block bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded">
                                {task.status}
                            </span>
                        </div>
                    </div>

                    {/* Date Added */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            DATE ADDED:
                        </h2>
                        <p className="text-gray-600">{task.dateAdded}</p>
                    </div>

                    {/* Delete Button */}
                    <div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => setIsDeleteModalOpen(true)}
                        >
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)} // Close DeleteModal
                title="Delete Task"
            />
        </div>
    );
};

export default TaskModal;
