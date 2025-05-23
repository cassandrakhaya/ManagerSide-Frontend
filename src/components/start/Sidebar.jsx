import React from 'react';
import './Sidebar.css'
const Sidebar = ({ menuItems, categories, selectedCategory, setSelectedCategory, setSelectedItem }) => {
  return (
    <div className="w-1/4 bg-white shadow-lg rounded-lg p-4">
      <select
        className="w-full p-2 mb-4 border rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <button
        className="bg-blue-500 text-white w-full p-2 rounded mb-4"
        onClick={() =>
          setSelectedItem({
            name: '',
            price: '',
            category: selectedCategory,
            description: ''
          })
        }
      >
        Nieuw product
      </button>

      <h2 className="text-lg font-semibold mb-2">{selectedCategory.toUpperCase()}</h2>
      <ul>
        {menuItems
          .filter(item => selectedCategory === "All" || item.category === selectedCategory)
          .map(item => (
            <li
              key={item.id}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedItem(item)}
            >
              <span className="font-semibold">{item.name}</span>
              <span className="block text-sm text-gray-500">€{item.price}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
