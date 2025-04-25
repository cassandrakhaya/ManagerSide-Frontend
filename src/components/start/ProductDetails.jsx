import React, { useState } from 'react';

const ProductDetails = ({ selectedItem, setSelectedItem, categories, menuItems, setMenuItems }) => {
  const allergien = ['Gluten', 'Lactose', 'Noten', 'Eieren', 'Soja'];

  const [selectedCategory, setSelectedCategory] = useState('Categorie selecteren');
  const [selectedAlergie, setSelectedAlergie] = useState('Allergie selecteren');

  const updateSelectedItem = (updatedFields) => {
    const updatedItem = { ...selectedItem, ...updatedFields };
    setSelectedItem(updatedItem);

    const updatedMenuItems = menuItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setMenuItems(updatedMenuItems);
  };

  const addCategoryToProduct = (category) => {
    const existing = selectedItem.categories || [];
    if (!existing.includes(category)) {
      updateSelectedItem({ categories: [...existing, category] });
    }
  };

  const removeCategoryFromProduct = (categoryToRemove) => {
    const updated = selectedItem.categories.filter(c => c !== categoryToRemove);
    updateSelectedItem({ categories: updated });
  };

  const addAlergieToProduct = (allergie) => {
    const existing = selectedItem.allergies || [];
    if (!existing.includes(allergie)) {
      updateSelectedItem({ allergies: [...existing, allergie] });
    }
  };

  const removeAlergieFromProduct = (allergieToRemove) => {
    const updated = selectedItem.allergies.filter(a => a !== allergieToRemove);
    updateSelectedItem({ allergies: updated });
  };

  return (
    <div className="flex-1 space-y-4 p-4">
      <div>
        <label className="block text-sm mb-1">Naam</label>
        <input
          type="text"
          value={selectedItem.name}
          onChange={e => updateSelectedItem({ name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="flex items-end">
        <div className="flex-1">
          <label className="block text-sm mb-1">Prijs</label>
          <input
            type="text"
            value={selectedItem.price.replace("€", "")}
            onChange={e => updateSelectedItem({ price: `€${e.target.value}` })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
        <span className="ml-2 mb-1 text-sm">EUR</span>
      </div>

      {/* Categorie selectie */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-grow">
          <label className="block font-semibold mb-1">Categorie</label>
          <select
            className="w-full border px-2 py-2 rounded"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              if (e.target.value !== 'Categorie selecteren') {
                addCategoryToProduct(e.target.value);
              }
            }}
          >
            <option value="Categorie selecteren" disabled>Categorie selecteren</option>
            {categories.filter(c => c !== "All").map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Categorieën weergeven */}
      {selectedItem.categories?.length > 0 && (
        <div>
          <label className="block text-sm mb-1">Toegevoegde Categorieën</label>
          <div className="flex flex-wrap gap-2">
            {selectedItem.categories.map((cat, i) => (
              <span
                key={i}
                className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-gray-700"
              >
                {cat}
                <button
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() => removeCategoryFromProduct(cat)}
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Allergieën selectie */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-grow">
          <label className="block font-semibold mb-1">Allergie</label>
          <select
            className="w-full border px-2 py-2 rounded"
            value={selectedAlergie}
            onChange={(e) => {
              setSelectedAlergie(e.target.value);
              if (e.target.value !== 'Allergie selecteren') {
                addAlergieToProduct(e.target.value);
              }
            }}
          >
            <option value="Allergie selecteren" disabled>Allergie selecteren</option>
            {allergien.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Allergieën weergeven */}
      {selectedItem.allergies?.length > 0 && (
        <div>
          <label className="block text-sm mb-1">Toegevoegde Allergieën</label>
          <div className="flex flex-wrap gap-2">
            {selectedItem.allergies.map((al, i) => (
              <span
                key={i}
                className="flex items-center bg-red-200 px-2 py-1 rounded text-xs text-gray-700"
              >
                {al}
                <button
                  className="ml-1 text-red-600 hover:text-red-800"
                  onClick={() => removeAlergieFromProduct(al)}
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm mb-1">Product beschrijving</label>
        <textarea
          rows={4}
          value={selectedItem.description}
          onChange={e => updateSelectedItem({ description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
