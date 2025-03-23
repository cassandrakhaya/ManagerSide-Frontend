import React, { useState } from "react";

const MenuForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleMenu = async () => {
        try {
            setName("");
            setDescription("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                Product Details
            </h2>

            {/* Name Input */}
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />

            {/* Description Input */}
            <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 h-24 resize-none"
            />

            {/* Save Button */}
            <button
                onClick={handleMenu}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Save
            </button>
        </div>
    );
};

export default MenuForm;
