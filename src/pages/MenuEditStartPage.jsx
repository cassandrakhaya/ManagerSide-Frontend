// src/pages/MenuEditStartPage.jsx
import React, { useState, useRef } from 'react';
import ProductDetails from '../components/start/ProductDetails';
import AfbeeldingUpload from '../components/start/AfbeeldingUpload';

const initialMenuItems = [
  { id: 1, name: "Pannenkoeken", category: "Lunch", price: "€5.00", description: "Fluffy pancakes with syrup and butter.", status: "Available", imageUrl: "" },
  { id: 2, name: "Spek en Eieren", category: "Lunch", price: "€6.50", description: "Crispy bacon with scrambled eggs.", status: "Available", imageUrl: "" },
  { id: 3, name: "Havermout met Fruit", category: "Lunch", price: "€4.50", description: "Healthy oatmeal with fresh fruits and honey.", status: "Available", imageUrl: "" },
  { id: 4, name: "Gegrilde Kaastosti", category: "Lunch", price: "€4.75", description: "Toasted sandwich with melted cheese.", status: "Available", imageUrl: "" },
  { id: 5, name: "Caesarsalade", category: "Lunch", price: "€6.50", description: "Crisp romaine lettuce with Caesar dressing and croutons.", status: "Available", imageUrl: "" },
  { id: 6, name: "Clubsandwich", category: "Lunch", price: "€7.00", description: "Triple-layered sandwich with turkey, bacon, and lettuce.", status: "Available", imageUrl: "" },
  { id: 7, name: "Spaghetti Bolognese", category: "Avondeten", price: "€8.00", description: "Classic pasta with rich meat sauce.", status: "Available", imageUrl: "" },
  { id: 8, name: "Salade Niçoise", category: "Avondeten", price: "€7.75", description: "French salad with tuna, eggs, and olives.", status: "Available", imageUrl: "" },
  { id: 9, name: "Vegan Boeuf Bourguignon", category: "Avondeten", price: "€8.00", description: "A rich French stew with red wine and vegetables.", status: "Available", imageUrl: "" },
  { id: 10, name: "Steak with Friet", category: "Avondeten", price: "€12.00", description: "Juicy grilled steak with crispy fries.", status: "Available", imageUrl: "" },
  { id: 11, name: "Coca Cola", category: "Drankjes", price: "€2.50", description: "Classic refreshing soft drink.", status: "Available", imageUrl: "" },
  { id: 12, name: "Vers Sinaasappelsap", category: "Drankjes", price: "€3.00", description: "Freshly squeezed orange juice.", status: "Available", imageUrl: "" },
  { id: 13, name: "Latte", category: "Drankjes", price: "€3.50", description: "Smooth espresso with steamed milk.", status: "Available", imageUrl: "" },
  { id: 14, name: "Appeltaart", category: "Toetjes", price: "€4.50", description: "Traditional apple pie with cinnamon.", status: "Available", imageUrl: "" },
  { id: 15, name: "Chocoladetaart", category: "Toetjes", price: "€5.00", description: "Rich and moist chocolate cake.", status: "Available", imageUrl: "" },
  { id: 16, name: "Tiramisu", category: "Toetjes", price: "€5.50", description: "Classic Italian dessert with coffee and mascarpone.", status: "Available", imageUrl: "" },
];

const categories = ["Alle Categorien", "Lunch", "Avondeten", "Drankjes", "Toetjes"];

const MenuEditStartPage = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(initialMenuItems[0]);
  const fileInputRef = useRef(null);

  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);

  const addNewProduct = () => {
    const newProduct = {
      id: menuItems.length + 1,
      name: "",
      category: selectedCategory !== "All" ? selectedCategory : "",
      price: "",
      description: "",
      status: "Available",
      imageUrl: ""
    };
    setMenuItems([...menuItems, newProduct]);
    setSelectedItem(newProduct);
  };

  const onSave = updatedItem => {
    setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    setSelectedItem(updatedItem);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedItem({ ...selectedItem, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow rounded-lg p-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Categorie Selecteren
        </label>
        <select
          className="w-full p-2 border rounded mb-4 text-sm"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <h2 className="text-lg font-semibold mb-2">Producten</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded w-full mb-4 text-sm transition-transform transform active:scale-95"
          onClick={addNewProduct}
        >
          + Nieuwe Product
        </button>

        <ul className="divide-y">
          {filteredMenuItems.map(item => (
            <li
              key={item.id}
              className={`p-2 cursor-pointer transition hover:bg-gray-100 ${
                selectedItem.id === item.id ? "bg-gray-50" : ""
              }`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="font-semibold">
                {item.name || "New Product"}
              </div>
              <div className="text-xs text-gray-500">{item.price}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Details */}
      <div className="w-3/4 bg-white border rounded-lg p-6 ml-4">
        <h2 className="text-xl font-semibold mb-6">Product Beschrijving</h2>
        <div className="flex">
          <ProductDetails
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            addNewProduct={addNewProduct}
            categories={categories}
          />
          <AfbeeldingUpload
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={selectedItem.status}
              onChange={e =>
                setSelectedItem({ ...selectedItem, status: e.target.value })
              }
              className="p-2 border border-gray-300 rounded text-sm"
            >
              <option>Beschikbaar</option>
              <option>Niet Beschikbaar</option>
            </select>
          </div>

          <button
            onClick={() => onSave(selectedItem)}
            className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition active:scale-95 text-sm"
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuEditStartPage;