import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CategoryManager = ({ categories, setCategories, onClose }) => {
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Add category via backend (use correct endpoint and object structure)
  const addCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      toast.error("Categorie mag niet leeg zijn.");
      return;
    }
    if (categories.includes(trimmed)) {
      toast.error("Categorie bestaat al.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/categories', { name: trimmed });
      setCategories([...categories, res.data.name]);
      setNewCategory("");
      toast.success(`Categorie "${trimmed}" toegevoegd.`);
    } catch {
      toast.error("Fout bij toevoegen categorie.");
    }
    setLoading(false);
  };

  // Remove category via backend (use correct endpoint and object structure)
  const removeCategory = async (categoryToRemove) => {
    setLoading(true);
    try {
      // Find category id by name (if available)
      const catRes = await axios.get('/api/categories');
      const found = catRes.data.find(c => c.name === categoryToRemove);
      if (!found) {
        toast.error("Categorie niet gevonden.");
        setLoading(false);
        return;
      }
      await axios.delete(`/api/categories/${found.categoryId || found.id}`);
      setCategories(categories.filter(cat => cat !== categoryToRemove));
      toast.info(`Categorie "${categoryToRemove}" verwijderd.`);
    } catch {
      toast.error("Fout bij verwijderen categorie.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Categorieën Bewerken</h2>

        <ul className="mb-4 max-h-40 overflow-y-auto pr-2">
          {categories.map((cat, idx) => (
            <li key={idx} className="flex justify-between items-center mb-2">
              <span>{cat}</span>
              <button
                onClick={() => removeCategory(cat)}
                className="text-red-500 text-sm hover:underline"
                disabled={loading}
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
            disabled={loading}
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600 text-sm"
            disabled={loading}
          >
            Toevoegen
          </button>
        </div>

        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm w-full"
          disabled={loading}
        >
          Sluiten
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;