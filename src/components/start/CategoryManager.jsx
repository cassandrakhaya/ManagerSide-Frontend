import React, { useState } from 'react';

const CategoryManager = ({ categories, setCategories, onClose }) => {
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setNewCategory("");
    }
  };

  const removeCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Categorieën Bewerken</h2>

        <ul className="mb-4 max-h-40 overflow-y-auto pr-2">
          {categories.map((cat, idx) => (
            <li key={idx} className="flex justify-between items-center mb-2">
              <span>{cat}</span>
              <button
                onClick={() => removeCategory(cat)}
                className="text-red-500 text-sm hover:underline"
              >
                Verwijderen
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 border p-2 rounded text-sm"
            placeholder="Nieuwe categorie"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600 text-sm"
          >
            Toevoegen
          </button>
        </div>

        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm w-full"
        >
          Sluiten
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;
