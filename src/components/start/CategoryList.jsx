import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Drinks",
    "Desserts",
    "Sides"
];

const CategoryList = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    // Handle category selection
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category) {
            navigate(`/menuPage/${category}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Kies een categorie</h1>
            
            {/* Dropdown Menu for Categories */}
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 border rounded-md"
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryList;

// import React from 'react';
// import { useNavigate } from "react-router-dom";
// import CategoryButton from "./CategoryButton";  


// const categories = [
//     "Breakfast",
//     "Lunch",
//     "Dinner",
//     "Drinks",
//     "Desserts",
//     "Sides"
// ];

// const CategoryList = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//             <h1 className="text-2xl font-bold mb-4">Kies een categorie</h1>
//             <div className="flex flex-wrap gap-4">
//                 {categories.map((category) => (
//                     <CategoryButton key={category} text={category} onClick={() => navigate(`/menuPage/${category}`)} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default CategoryList;