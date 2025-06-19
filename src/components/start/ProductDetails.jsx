import React, { useState } from 'react';

const ProductDetails = ({
  selectedItem,
  setSelectedItem,
  addNewProduct,
  categories,
  allergens,
  menuItems,
  setMenuItems
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Categorie selecteren');
  const [selectedAlergie, setSelectedAlergie] = useState('Allergie selecteren');

  // Guard: if no product is selected, show a message
  if (!selectedItem) {
    return (
      <div className="flex-1 space-y-4 p-4">
        <p className="text-gray-500">Selecteer een product om details te bekijken of te bewerken.</p>
      </div>
    );
  }

  // Update selectedItem and menuItems in parent
  const updateSelectedItem = (updatedFields) => {
    const updatedItem = { ...selectedItem, ...updatedFields };
    setSelectedItem(updatedItem);

    if (setMenuItems && menuItems) {
      const updatedMenuItems = menuItems.map(item =>
        (item.dishID || item.id) === (updatedItem.dishID || updatedItem.id) ? updatedItem : item
      );
      setMenuItems(updatedMenuItems);
    }
  };

  // Add/remove category (by object)
  const addCategoryToProduct = (categoryName) => {
    const existing = selectedItem.categories || [];
    const catObj = categories.find(c => c.name === categoryName);
    if (!catObj || existing.some(c => c.categoryId === catObj.categoryId)) return;
    updateSelectedItem({ categories: [...existing, { categoryId: catObj.categoryId, name: catObj.name }] });
    setSelectedCategory('Categorie selecteren');
  };

  const removeCategoryFromProduct = (categoryToRemove) => {
    const updated = (selectedItem.categories || []).filter(c => c.name !== categoryToRemove);
    updateSelectedItem({ categories: updated });
  };

  // Add/remove allergen (by object)
  const addAlergieToProduct = (allergieName) => {
    const existing = selectedItem.allergies || [];
    const alObj = allergens.find(a => a.name === allergieName);
    if (!alObj || existing.some(a => a.allergenId === alObj.allergenId)) return;
    updateSelectedItem({ allergies: [...existing, { allergenId: alObj.allergenId, name: alObj.name }] });
    setSelectedAlergie('Allergie selecteren');
  };

  const removeAlergieFromProduct = (allergieToRemove) => {
    const updated = (selectedItem.allergies || []).filter(a => a.name !== allergieToRemove);
    updateSelectedItem({ allergies: updated });
  };

  const handleSelectItem = (item) => {
    setSelectedItem({
      ...item,
      categories: (item.categories || []).map(catName =>
        categories.find(c => c.name === catName) || { name: catName }
      ),
      allergies: (item.allergens || item.allergies || []).map(alName =>
        allergens.find(a => a.name === alName) || { name: alName }
      ),
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4">
      <div>
        <label className="block text-sm mb-1">Naam</label>
        <input
          type="text"
          value={selectedItem.name || ''}
          onChange={e => updateSelectedItem({ name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="flex items-end">
        <div className="flex-1">
          <label className="block text-sm mb-1">Prijs</label>
          <input
            type="text"
            value={
              selectedItem.price !== undefined && selectedItem.price !== null
                ? String(selectedItem.price).replace("€", "")
                : ''
            }
            onChange={e => updateSelectedItem({ price: e.target.value })}
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
              if (e.target.value !== 'Categorie selecteren') {
                addCategoryToProduct(e.target.value);
              }
            }}
          >
            <option value="Categorie selecteren" disabled>Categorie selecteren</option>
            {categories && categories
              .filter(c =>
                c.name !== "All" &&
                !(selectedItem.categories || []).some(sel => sel.categoryId === c.categoryId)
              )
              .map(c => (
                <option key={c.categoryId} value={c.name}>{c.name}</option>
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
                key={cat.categoryId || i}
                className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-gray-700"
              >
                {cat.name}
                <button
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() => removeCategoryFromProduct(cat.name)}
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
              if (e.target.value !== 'Allergie selecteren') {
                addAlergieToProduct(e.target.value);
              }
            }}
          >
            <option value="Allergie selecteren" disabled>Allergie selecteren</option>
            {allergens && allergens
              .filter(a =>
                !(selectedItem.allergies || []).some(sel => sel.allergenId === a.allergenId)
              )
              .map(a => (
                <option key={a.allergenId} value={a.name}>{a.name}</option>
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
                key={al.allergenId || i}
                className="flex items-center bg-red-200 px-2 py-1 rounded text-xs text-gray-700"
              >
                {al.name}
                <button
                  className="ml-1 text-red-600 hover:text-red-800"
                  onClick={() => removeAlergieFromProduct(al.name)}
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
          value={selectedItem.description || ''}
          onChange={e => updateSelectedItem({ description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
        />
      </div>
    </div>
  );
};

export default ProductDetails;