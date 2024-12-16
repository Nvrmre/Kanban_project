import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteModal from "@/Components/DeleteModal";
import { FaTimes } from "react-icons/fa";
import InputLabel from "@/Components/InputLabel";
import { IoMdSend } from "react-icons/io";
import DangerButton from "@/Components/DangerButton";


const TaskModal = ({ isOpen, onClose, task }) => {
    // Add a guard clause if task is null
    if (!isOpen || !task) return null;

    const [checklist, setChecklist] = useState(task.checklist || []);
    const [newTask, setNewTask] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");

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

    // comments
    const addComment = (e) => {
        e.preventDefault();
        if (newComment.trim() !== "") {
            task.comments.push({ id: `c${task.comments.length + 1}`, name: "You", text: newComment });
            setNewComment("");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <FaTimes className="text-2xl"/>
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

                    {/* Due Date */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                                DUE DATE:
                        </h2>
                        <input
                            type="date"
                            value={task.dueDate || ""}
                            onChange={(e) => (task.dueDate = e.target.value)} 
                            className="w-25 border border-gray-300 rounded p-2 mt-1"
                        />
                    </div>

                    {/* Setting */}
                    {/* <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            SETTING:
                        </h2>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <InputLabel value="Notification Duration :" className="text-sm font-medium text-gray-700" />
                                <select
                                    className="w-25 border border-gray-300 rounded pe-7"
                                    value={task.notificationDuration || "6"}
                                    onChange={(e) => (task.notificationDuration = e.target.value)}
                                >
                                    <option value="">6 hours</option>
                                    <option value="">12 hours</option>
                                    <option value="">1 day</option>
                                    <option value="">3 days</option>
                                    <option value="">5 days</option>
                                    <option value="">7 days</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <InputLabel value="Role Member :" className="text-sm font-medium text-gray-700" />
                                <select
                                    className="w-25 border border-gray-300 rounded pe-7"
                                    value={task.roleMember || "member"}
                                    onChange={(e) => (task.roleMember = e.target.value)}
                                >
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    </div> */}

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
                                                            <FaTimes className="text-2xl"/>
                                                            
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
                        <DangerButton className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsDeleteModalOpen(true)}
                        >
                            Delete Task
                        </DangerButton>
                    </div>

                    {/* Comments */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">COMMENTS:</h2>
                        <div className="space-y-2 mt-2">
                            {task.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-gray-100 p-2 rounded shadow"
                                >
                                    <strong className="text-blue-600">
                                        {comment.name}:
                                    </strong>{" "}
                                    <span>{comment.text}</span>
                                </div>
                            ))}
                        </div>
                        <form
                            className="mt-3 flex items-center space-x-2"
                            onSubmit={addComment}
                        >
                            <input
                                type="text"
                                placeholder="Add a comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1 border border-gray-300 rounded p-2"
                            />
                            <button
                                type="submit"
                                className="flex items-center bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Send<IoMdSend className="ms-2"/>
                            </button>
                        </form>
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
