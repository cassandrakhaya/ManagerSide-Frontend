import React, { useState } from 'react';

import CategoryList from '../components/start/CategoryList.jsx';
import MenuEdit from '../components/start/MenuEdit.jsx';

const MenuItems = [
    { id: 1, name: "Pancakes", category: "Breakfast" },
    { id: 2, name: "Bacon and Eggs", category: "Breakfast" },
    { id: 3, name: "Grilled Cheese Sandwich", category: "Lunch" },
    { id: 4, name: "Spaghetti Bolognese", category: "Dinner" },
    { id: 5, name: "Coca Cola", category: "Drinks" },
    { id: 6, name: "Apple Pie", category: "Desserts" },
]
const MenuStartPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Filter menu items based on the selected category
    const filteredMenuItems = selectedCategory
        ? MenuItems.filter(item => item.category === selectedCategory)
        : MenuItems;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            {/* Page Container with a Card Layout */}
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Manager Menu Edit Page
                </h1>

                {/* Category List - Right Below h1 */}
                <div className="mb-4">
                    <CategoryList 
                        selectedCategory={selectedCategory} 
                        onCategorySelect={setSelectedCategory} 
                    />
                </div>

                {/* Menu Edit - No Extra Space Between */}
                <div className="mt-0">
                    <MenuEdit selectedCategory={selectedCategory} />
                </div>

                {/* Display Menu Items */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        {selectedCategory ? `${selectedCategory} Menu Items` : "All Menu Items"}
                    </h2>
                    <ul className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        {filteredMenuItems.length > 0 ? (
                            filteredMenuItems.map((item) => (
                                <li 
                                    key={item.id} 
                                    className="p-2 border-b last:border-none flex justify-between text-gray-700"
                                >
                                    <span>{item.name}</span>
                                    <span className="text-sm text-gray-500">{item.category}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 text-center">No items in this category</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MenuStartPage;
// const MenuStartPage = () => {
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            
//             {/* Page Container with a Card Layout */}
//             <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                
//                 {/* Page Title */}
//                 <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//                     Manager Menu Edit Page
//                 </h1>

//                 {/* Category List - Right Below h1 */}
//                 <div className="mb-4">
//                     <CategoryList />
//                 </div>

//                 {/* Menu Edit - No Extra Space Between */}
//                 <div className="mt-0">
//                     <MenuEdit />
//                 </div>

//                 {/* Display Menu Items */}
//                 <div className="mt-6">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-2">Menu Items</h2>
//                     <ul className="bg-gray-50 p-4 rounded-lg shadow-sm">
//                         {MenuItems.map((item) => (
//                             <li 
//                                 key={item.id} 
//                                 className="p-2 border-b last:border-none flex justify-between text-gray-700"
//                             >
//                                 <span>{item.name}</span>
//                                 <span className="text-sm text-gray-500">{item.category}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MenuStartPage;


