import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedItem,
  refreshTrigger // optional: to refetch when parent updates
}) => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and menu items from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, dishRes] = await Promise.all([
          axios.get('/api/categories'),
          axios.get('/api/dish')
        ]);
        setCategories(['All', ...catRes.data.map(c => c.name)]);
        setMenuItems(dishRes.data);
        if (!selectedCategory) setSelectedCategory('All');
      } catch (err) {
        // Handle error as needed
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [refreshTrigger]);

  if (loading) {
    return <div className="w-1/4 p-4">Laden...</div>;
  }

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
            category: selectedCategory === 'All' ? '' : selectedCategory,
            description: '',
            categories: [],
            allergies: [],
            status: true,
            imageUrl: ''
          })
        }
      >
        Nieuw product
      </button>

      <h2 className="text-lg font-semibold mb-2">{selectedCategory?.toUpperCase()}</h2>
      <ul>
        {menuItems
          .filter(item =>
            selectedCategory === "All" ||
            (item.categories && item.categories.includes(selectedCategory))
          )
          .map(item => (
            <li
              key={item.dishID || item.id}
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