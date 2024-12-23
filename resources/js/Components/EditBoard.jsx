import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const EditBoard = ({ isOpen, onClose, boards }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
    });
    useEffect(() => {
        if (boards) {
            setData("name", boards.name || ""); // Set the initial value for 'name'
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Complete task data:", boards);
        router.visit(`/boards/${boards.id}`, {
            method: "put",
            data: data,
            onSuccess: () => {
                console.log("Board updated successfully", data);
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
                    Edit Board
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

                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
                    >
                        Edit Board
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBoard;
