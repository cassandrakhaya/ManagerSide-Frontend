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
const CategoryList = ({ selectedCategory, onCategorySelect }) => {
    return (
        <div className="flex justify-center">
            <select
                value={selectedCategory || "All"}
                onChange={(e) => onCategorySelect(e.target.value === "All" ? null : e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700"
            >
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryList;
// const CategoryList = () => {
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const navigate = useNavigate();

//     // Handle category selection
//     const handleCategoryChange = (event) => {
//         const category = event.target.value;
//         setSelectedCategory(category);
//         if (category) {
//             navigate(`/menuPage/${category}`);
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//             <h1 className="text-2xl font-bold mb-4">Kies een categorie</h1>
            
//             {/* Dropdown Menu for Categories */}
//             <select
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//                 className="p-2 border rounded-md"
//             >
//                 <option value="">Select a category</option>
//                 {categories.map((category) => (
//                     <option key={category} value={category}>
//                         {category}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default CategoryList;

