import React, { useState } from "react";
// import React from 'react';


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
        <div className="post-form">
            <h2>Product Details</h2>
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleMenu}>Save</button>
        </div>
    );
};

export default MenuForm;

 


