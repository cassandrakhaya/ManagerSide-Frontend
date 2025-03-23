import React, { useState } from 'react';

import CategoryList from '../components/start/CategoryList.jsx';
import MenuEdit from '../components/start/MenuEdit.jsx';
import Sidebar from '../components/start/Sidebar.jsx';
import ProductDetails from '../components/start/ProductDetails.jsx';

const MenuItems = [
    { id: 1, name: "Pancakes", category: "Breakfast", price: "€5.00", description: "Fluffy pancakes with syrup and butter." },
    { id: 2, name: "Bacon and Eggs", category: "Breakfast", price: "€6.50", description: "Crispy bacon with scrambled eggs." },
    { id: 3, name: "Oatmeal with Fruits", category: "Breakfast", price: "€4.50", description: "Healthy oatmeal with fresh fruits and honey." },
    { id: 4, name: "Grilled Cheese Sandwich", category: "Lunch", price: "€4.75", description: "Toasted sandwich with melted cheese." },
    { id: 5, name: "Caesar Salad", category: "Lunch", price: "€6.50", description: "Crisp romaine lettuce with Caesar dressing and croutons." },
    { id: 6, name: "Club Sandwich", category: "Lunch", price: "€7.00", description: "Triple-layered sandwich with turkey, bacon, and lettuce." },
    { id: 7, name: "Spaghetti Bolognese", category: "Dinner", price: "€8.00", description: "Classic pasta with rich meat sauce." },
    { id: 8, name: "Salade Niçoise", category: "Dinner", price: "€7.75", description: "French salad with tuna, eggs, and olives." },
    { id: 9, name: "Vegan Boeuf Bourguignon", category: "Dinner", price: "€8.00", description: "A rich French stew with red wine and vegetables." },
    { id: 10, name: "Steak with Fries", category: "Dinner", price: "€12.00", description: "Juicy grilled steak with crispy fries." },
    { id: 11, name: "Coca Cola", category: "Drinks", price: "€2.50", description: "Classic refreshing soft drink." },
    { id: 12, name: "Fresh Orange Juice", category: "Drinks", price: "€3.00", description: "Freshly squeezed orange juice." },
    { id: 13, name: "Latte", category: "Drinks", price: "€3.50", description: "Smooth espresso with steamed milk." },
    { id: 14, name: "Apple Pie", category: "Desserts", price: "€4.50", description: "Traditional apple pie with cinnamon." },
    { id: 15, name: "Chocolate Cake", category: "Desserts", price: "€5.00", description: "Rich and moist chocolate cake." },
    { id: 16, name: "Tiramisu", category: "Desserts", price: "€5.50", description: "Classic Italian dessert with coffee and mascarpone." },
];

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

const MenuStartPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Dinner");
    const [selectedItem, setSelectedItem] = useState(MenuItems[0]);

    return (
        <div className="min-h-screen flex bg-gray-100 p-6">
            <Sidebar 
                menuItems={MenuItems} 
                categories={categories}
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                setSelectedItem={setSelectedItem} 
            />
            <ProductDetails selectedItem={selectedItem} selectedCategory={selectedCategory} />
        </div>
    );
};

export default MenuStartPage;

// const categories = ["All", "Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

// const MenuStartPage = () => {
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [menuItems, setMenuItems] = useState(MenuItems);
//     const [selectedItem, setSelectedItem] = useState(MenuItems[0]);

//     const filteredMenuItems = selectedCategory === "All" 
//         ? menuItems 
//         : menuItems.filter(item => item.category === selectedCategory);

//     const addNewProduct = () => {
//         const newProduct = { id: menuItems.length + 1, name: "New Product", category: "", price: "", description: "" };
//         setMenuItems([...menuItems, newProduct]);
//         setSelectedItem(newProduct);
//     };

//     return (
//         <div className="min-h-screen flex bg-gray-100 p-6">
//             <div className="w-1/4 bg-white shadow-lg rounded-lg p-4">
//                 <label className="block text-gray-700 font-semibold mb-2">Select Category</label>
//                 <select 
//                     className="w-full p-2 border rounded mb-4" 
//                     value={selectedCategory} 
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                     {categories.map((category) => (
//                         <option key={category} value={category}>{category}</option>
//                     ))}
//                 </select>

//                 <h2 className="text-lg font-semibold mb-2">Products</h2>
//                 <button className="bg-blue-500 text-white p-2 rounded w-full mb-4" onClick={addNewProduct}>+ New Product</button>
//                 <ul>
//                     {filteredMenuItems.map((item) => (
//                         <li key={item.id} className="p-2 border-b cursor-pointer" onClick={() => setSelectedItem(item)}>
//                             <span className="font-semibold">{item.name}</span>
//                             <span className="block text-sm text-gray-500">{item.price}</span>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 ml-4">
//                 <h2 className="text-2xl font-bold mb-4">Product details</h2>
                
//                 <div className="flex">
//                     <div className="w-1/2">
//                         <label className="block text-gray-700">Name</label>
//                         <input className="w-full p-2 border rounded mb-4" value={selectedItem?.name || ""} readOnly />

//                         <label className="block text-gray-700">Price</label>
//                         <input className="w-full p-2 border rounded mb-4" value={selectedItem?.price || ""} readOnly />

//                         <label className="block text-gray-700">Category</label>
//                         <input className="w-full p-2 border rounded mb-4" value={selectedItem?.category || ""} readOnly />

//                         <label className="block text-gray-700">Product description</label>
//                         <textarea className="w-full p-2 border rounded" value={selectedItem?.description || ""} readOnly />
//                     </div>

//                     <div className="w-1/2 flex flex-col items-center">
//                         <img className="w-full h-40 object-cover rounded mb-4" src="https://via.placeholder.com/300" alt="Product" />
//                         <button className="bg-gray-300 text-gray-700 p-2 rounded">Change Image</button>
//                     </div>
//                 </div>

//                 <label className="block text-gray-700 mt-4">Status</label>
//                 <select className="w-full p-2 border rounded">
//                     <option>Available</option>
//                     <option>Out of Stock</option>
//                 </select>

//                 <button className="bg-blue-500 text-white p-2 rounded w-full mt-4">Save</button>
//             </div>
//         </div>
//     );
// };

// export default MenuStartPage;

