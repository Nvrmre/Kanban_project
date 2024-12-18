import React from "react";
import { Transition } from "@headlessui/react";

const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Green", value: "#22c55e" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#000000" },
];

export default function EditCardModal({ isOpen, onClose, onSelectColor }) {
    if (!isOpen) return null;

    return (
        <Transition
            appear
            show={isOpen}
            enter="ease-out duration-20"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl transform transition-all">
                    <h3 className="text-lg font-medium text-gray-900">
                        Select a Color
                    </h3>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => {
                                    onSelectColor(color.value);
                                    onClose();
                                }}
                                className="w-10 h-10 rounded-full border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                style={{ backgroundColor: color.value }}
                            ></button>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
