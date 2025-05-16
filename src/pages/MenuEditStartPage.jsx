import React, { useState, useRef, useEffect } from 'react';
import ProductDetails from '../components/start/ProductDetails';
import AfbeeldingUpload from '../components/start/AfbeeldingUpload';
import Sidebar from '../components/start/Sidebar';
import CategoryManager from '../components/start/CategoryManager';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

const initialMenuItems = [
  { id: 1, name: "Pannenkoeken", category: "Lunch", price: "5.00", description: "Fluffy pancakes with syrup and butter.", status: true, imageUrl: "" },
  { id: 2, name: "Spek en Eieren", category: "Lunch", price: "7.50", description: "Crispy bacon with scrambled eggs.", status: true, imageUrl: "" },
  { id: 3, name: "Havermout met Fruit", category: "Lunch", price: "4.50", description: "Healthy oatmeal with fresh fruits and honey.", status: true, imageUrl: "" },
  { id: 4, name: "Gegrilde Kaastosti", category: "Lunch", price: "4.75", description: "Toasted sandwich with melted cheese.", status: true, imageUrl: "" },
  { id: 5, name: "Caesarsalade", category: "Lunch", price: "6.50", description: "Crisp romaine lettuce with Caesar dressing and croutons.", status: true, imageUrl: "" },
  { id: 6, name: "Clubsandwich", category: "Lunch", price: "7.00", description: "Triple-layered sandwich with turkey, bacon, and lettuce.", status: true, imageUrl: "" },
  { id: 7, name: "Spaghetti Bolognese", category: "Avondeten", price: "8.00", description: "Classic pasta with rich meat sauce.", status: true, imageUrl: "" },
  { id: 8, name: "Salade Niçoise", category: "Avondeten", price: "7.75", description: "French salad with tuna, eggs, and olives.", status: true, imageUrl: "" },
  { id: 9, name: "Vegan Boeuf Bourguignon", category: "Avondeten", price: "8.00", description: "A rich French stew with red wine and vegetables.", status: true, imageUrl: "" },
  { id: 10, name: "Steak met Friet", category: "Avondeten", price: "12.00", description: "Juicy grilled steak with crispy fries.", status: true, imageUrl: "" },
  { id: 11, name: "Coca Cola", category: "Drankjes", price: "2.50", description: "Classic refreshing soft drink.", status: true, imageUrl: "" },
  { id: 12, name: "Vers Sinaasappelsap", category: "Drankjes", price: "3.00", description: "Freshly squeezed orange juice.", status: true, imageUrl: "" },
  { id: 13, name: "Latte", category: "Drankjes", price: "3.50", description: "Smooth espresso with steamed milk.", status: true, imageUrl: "" },
  { id: 14, name: "Appeltaart", category: "Toetjes", price: "4.50", description: "Traditional apple pie with cinnamon.", status: true, imageUrl: "" },
  { id: 15, name: "Chocoladetaart", category: "Toetjes", price: "5.00", description: "Rich and moist chocolate cake.", status: true, imageUrl: "" },
  { id: 16, name: "Tiramisu", category: "Toetjes", price: "5.50", description: "Classic Italian dessert with coffee and mascarpone.", status: true, imageUrl: "" },
];

const MenuEditStartPage = ({ showCategoryEditor, setShowCategoryEditor }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [categories, setCategories] = useState(["Lunch", "Avondeten", "Drankjes", "Toetjes"]);
  const [selectedAlergie, setSelectedAlergie] = useState("Allergie selecteren");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(initialMenuItems[0]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.post("/api/dish")
      .then(response => {
        console.log("Dishes created successfully:", response.data);
        addNewProduct();
      })
      .catch(error => {
        console.error("Error creating dishes:", error);
      });
  }, []);

  const addNewProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "",
      category: selectedCategory !== "All" ? selectedCategory : "",
      allergens: selectedAlergie !== "Allergie selecteren" ? selectedAlergie : "",
      price: "",
      description: "",
      status: true,
      imageUrl: ""
    };
    setMenuItems(prev => [...prev, newProduct]);
    setSelectedItem(newProduct);
  };

  const onSave = updatedItem => {
    const updatedMenuItems = menuItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setMenuItems(updatedMenuItems);
    setSelectedItem(updatedItem);
    toast.success("Product succesvol opgeslagen!");

    if (selectedCategory !== "All" && selectedCategory !== updatedItem.category) {
      setSelectedCategory(updatedItem.category);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedItem(prev => ({ ...prev, imageUrl: reader.result }));
      toast.success("Afbeelding succesvol geüpload!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 p-6">
      <Sidebar 
        menuItems={menuItems} 
        categories={categories} 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory} 
        setSelectedItem={setSelectedItem}
      />

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
              value={selectedItem.status ? "Beschikbaar" : "Niet Beschikbaar"}
              onChange={e =>
                setSelectedItem({ ...selectedItem, status: e.target.value === "Beschikbaar" })
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

      {showCategoryEditor && (
        <CategoryManager
          categories={categories}
          setCategories={setCategories}
          onClose={() => setShowCategoryEditor(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default MenuEditStartPage;
