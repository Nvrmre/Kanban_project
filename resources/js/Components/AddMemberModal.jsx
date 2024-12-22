import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import { BsPersonFillAdd } from "react-icons/bs";

const AddMemberModal = ({ isOpen, onClose }) => {
    const [members, setMembers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [role, setRole] = useState("member");

    useEffect(() => {
        // Add current user to the member list when modal opens
        if (isOpen) {
            setMembers([{ name: "You", role: "admin" }]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAddMember = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        setMembers((prev) => [
            ...prev,
            { name: inputValue, role }
        ]);
        setInputValue("");
    };

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
                    Share Project
                </h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleAddMember}>
                    <div className="flex flex-row space-x-1">
                        <TextInput
                            type="text"
                            className="block w-4/5 p-2 text-sm text-gray-700"
                            placeholder="Enter Email or Name"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <select
                            className="block w-1/5 p-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>

                        <PrimaryButton className="w-auto justify-center" type="submit">
                            <BsPersonFillAdd className="text-lg" />
                        </PrimaryButton>
                    </div>

                    <hr />
                
                    

                    {/* Member List */}
                    <div>
                        <ul className="list-disc pl-4 mt-2">
                            {members.map((member, index) => (
                                <li key={index}>
                                    {member.name} - <span className="italic text-gray-600">{member.role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;


// MODAL UNTUK ADD MEMBER MODAL KALO JADI DIPAKE
