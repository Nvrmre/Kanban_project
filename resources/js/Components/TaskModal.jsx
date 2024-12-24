import { useState, useEffect } from "react";
import { FaTimes, FaSave, FaTrash, FaEdit } from "react-icons/fa";
import InputLabel from "@/Components/InputLabel";
import { router, usePage } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";

const TaskModal = ({ isOpen, onClose, task }) => {
    const { users, comments } = usePage().props; // Ambil data komentar dari props
    const userId = users ? users.id : null; // Pastikan id ada dan bisa diakses
    console.log("User ID:", userId);

    if (!isOpen || !task) return null;

    const [data, setData] = useState({
        name: "",
        description: "",
        due_date: "",
        priority: "",
        status: "",
        created_at: "",
        assigned_id: "",
    });

    const [comment, setComment] = useState(""); // State untuk komentar
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (task) {
            setData({
                name: task.name || "",
                description: task.description || "",
                due_date: task.due_date || "",
                priority: task.priority || "",
                status: task.status || "",
                created_at: task.created_at || "",
                assigned_id: task.assignedUser?.id || "",
            });
        }
    }, [isOpen, task, users]);

    console.log(comments);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...data,
            assigned_id: data.assigned_id || null,
        };
        console.log("Submitting data:", formData);
        router.put(`/task/${task.id}`, data, {
            onSuccess: () => {
                setIsEditing(false);
                onClose();
            },
        });
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete(`/task/${task.id}`, {
                onSuccess: onClose,
            });
        }
    };

    const handleCommentSubmit = (e) => {
        console.log("Submitting comment:", comment, users, task.id);
        e.preventDefault();
        if (comment.trim() === "") return; // Jangan kirim komentar kosong

        // Pastikan task_id dan user_id disertakan
        const formData = {
            comment,
            task_id: task.id, // Ambil task_id dari task yang sedang ditangani
            user_id: task.assigned_id, // Ambil user_id dari data pengguna yang sedang login
        };

        console.log("Submitting comment data:", formData); // Debugging: Periksa data yang dikirimkan

        router.post("/comment", formData, {
            onSuccess: () => {
                setComment(""); // Reset komentar setelah berhasil dikirim
            },
            onError: (errors) => {
                console.log("Error submitting comment:", errors); // Debugging: Periksa error response
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <FaTimes size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="Task Name" />
                        {isEditing ? (
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData({ ...data, name: e.target.value })
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-sm text-gray-700">{data.name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="description" value="Description" />
                        {isEditing ? (
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        description: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-sm text-gray-700">{data.description}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="due_date" value="Due Date" />
                        {isEditing ? (
                            <input
                                type="date"
                                id="due_date"
                                value={data.due_date}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        due_date: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-sm text-gray-700">{data.due_date}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="priority" value="Priority" />
                        {isEditing ? (
                            <select
                                id="priority"
                                value={data.priority}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        priority: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        ) : (
                            <p className="text-sm text-gray-700">{data.priority}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <InputLabel htmlFor="status" value="Status" />
                        {isEditing ? (
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData({ ...data, status: e.target.value })
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="to_do">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Completed</option>
                            </select>
                        ) : (
                            <p className="text-sm text-gray-700">{data.status}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="assigned_id" value="Assign User" />
                        {isEditing ? (
                            <select
                                id="assigned_id"
                                value={data.assigned_id || ""}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        assigned_id: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select User Email</option>
                                {Array.isArray(users) ? (
                                    users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.email}
                                        >
                                            {user.email} - {user.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Loading users...</option>
                                )}
                            </select>
                        ) : (
                            <p className="text-sm text-gray-700">
                                {task.assigned_id}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                        {isEditing ? (
                            <>
                                <PrimaryButton
                                    type="submit"
                                    className="text-sm"
                                >
                                    <FaSave className="mr-2" />
                                    Save
                                </PrimaryButton>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded text-sm"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center text-sm"
                                >
                                    <FaEdit className="mr-2" />
                                    Edit
                                </button>
                                <DangerButton
                                    type="button"
                                    onClick={handleDelete}
                                    className="text-sm"
                                >
                                    <FaTrash className="mr-2" />
                                    Delete
                                </DangerButton>
                            </>
                        )}
                    </div>
                </form>

                {/* Form komentar */}
                <div className="mb-4 mt-4">
                    <InputLabel htmlFor="comment" value="Add Comment" />
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your comment"
                    />
                    <div className="mt-2 flex justify-end">
                        <PrimaryButton
                            onClick={handleCommentSubmit}
                            className="text-sm"
                        >
                            Add Comment
                        </PrimaryButton>
                    </div>
                </div>

                {/* Daftar Komentar */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Comments</h3>
                    <ul className="space-y-4">
                        {comments
                            ?.filter((comment) => comment.task_id === task.id)
                            .map((comment) => (
                                <li
                                    key={comment.id}
                                    className="bg-gray-100 p-3 rounded-lg shadow-sm"
                                >
                                    <p className="text-sm">{comment.comment}</p>
                                    <span className="text-xs text-gray-500">
                                        {comment.user?.name} - {comment.created_at}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
