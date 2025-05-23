import React, { useState, useRef, useEffect } from 'react';
import ProductDetails from '../components/start/ProductDetails';
import AfbeeldingUpload from '../components/start/AfbeeldingUpload';
import Sidebar from '../components/start/Sidebar';
import CategoryManager from '../components/start/CategoryManager';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MenuEditStartPage = ({ showCategoryEditor, setShowCategoryEditor }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [dishesRes, categoriesRes, allergensRes] = await Promise.all([
        axios.get('/api/dish'),
        axios.get('/api/categories'),
        axios.get('/api/allergens')
      ]);
      setMenuItems(dishesRes.data);
      setCategories(categoriesRes.data); // full objects
      setAllergens(allergensRes.data);   // full objects
      setSelectedItem(dishesRes.data[0] || null);
    } catch (err) {
      toast.error("Fout bij laden van data!");
    }
  };

  // Helper: get category/allergen IDs from names
  const getCategoryIds = (categoryNames) => {
    return categories
      .filter(cat => categoryNames.includes(cat.name))
      .map(cat => cat.categoryId);
  };

  const getAllergenIds = (allergenNames) => {
    return allergens
      .filter(al => allergenNames.includes(al.name))
      .map(al => al.allergenId);
  };

  const addNewProduct = async () => {
    try {
      const newProduct = {
        name: "",
        description: "",
        price: 0,
        isAvailable: true,
        categoryIds: [],
        allergenIds: []
      };
      const res = await axios.post('/api/dish', newProduct);
      setMenuItems(prev => [...prev, res.data]);
      setSelectedItem(res.data);
    } catch (err) {
      toast.error("Fout bij toevoegen van product!");
    }
  };

  const onSave = async updatedItem => {
    try {
      // Convert categories/allergies (names) to IDs for backend
      const categoryIds = getCategoryIds(updatedItem.categories || []);
      const allergenIds = getAllergenIds(updatedItem.allergies || []);

      // Try to find an existing dish by name (case-insensitive)
      const existingDish = menuItems.find(
        d => d.name.trim().toLowerCase() === updatedItem.name.trim().toLowerCase()
      );

      if (existingDish) {
        // Build full objects with required fields for PUT
        const categoryObjs = categories
          .filter(cat => (updatedItem.categories || []).includes(cat.name))
          .map(cat => ({
            categoryId: cat.categoryId,
            name: cat.name,
            dishes: [] // required by backend
          }));

        const allergenObjs = allergens
          .filter(al => (updatedItem.allergies || []).includes(al.name))
          .map(al => ({
            allergenId: al.allergenId,
            name: al.name,
            dishes: [] // required by backend
          }));

        await axios.put(`/api/dish/${existingDish.dishID || existingDish.id}`, {
          dishID: existingDish.dishID || existingDish.id,
          name: updatedItem.name,
          description: updatedItem.description,
          price: Number(
            typeof updatedItem.price === "string"
              ? updatedItem.price.replace("€", "").replace(",", ".")
              : updatedItem.price
          ),
          isAvailable: updatedItem.status ?? true,
          categories: categoryObjs,
          allergens: allergenObjs
        });
        toast.success("Product succesvol bijgewerkt!");
      } else {
        // Create new dish (POST expects only IDs)
        await axios.post('/api/dish', {
          name: updatedItem.name,
          description: updatedItem.description,
          price: Number(
            typeof updatedItem.price === "string"
              ? updatedItem.price.replace("€", "").replace(",", ".")
              : updatedItem.price
          ),
          isAvailable: updatedItem.status ?? true,
          categoryIds,
          allergenIds
        });
        toast.success("Product succesvol aangemaakt!");
      }

      // Refetch all dishes to get updated data
      fetchAllData();

      // Optionally update selectedCategory if needed
      if (
        selectedCategory !== "All" &&
        updatedItem.categories &&
        !updatedItem.categories.includes(selectedCategory)
      ) {
        setSelectedCategory(updatedItem.categories[0] || "All");
      }
    } catch (err) {
      toast.error("Fout bij opslaan van product!");
    }
  };

  // Category CRUD
  const handleAddCategory = async (name) => {
    try {
      const res = await axios.post('/api/categories', { name });
      setCategories([...categories, res.data]);
      toast.success(`Categorie "${res.data.name}" toegevoegd.`);
    } catch (err) {
      toast.error("Fout bij toevoegen categorie!");
    }
  };

  const handleRemoveCategory = async (name) => {
    try {
      const found = categories.find(c => c.name === name);
      if (!found) {
        toast.error("Categorie niet gevonden.");
        return;
      }
      await axios.delete(`/api/categories/${found.categoryId}`);
      setCategories(categories.filter(cat => cat.name !== name));
      toast.info(`Categorie "${name}" verwijderd.`);
    } catch (err) {
      toast.error("Fout bij verwijderen categorie.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 p-6">
      <Sidebar
        menuItems={menuItems}
        categories={["All", ...categories.map(c => c.name)]}
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
            categories={categories.map(c => c.name)}
            allergens={allergens.map(a => a.name)}
            menuItems={menuItems}
            setMenuItems={setMenuItems}
          />
          {/* Remove AfbeeldingUpload until backend support is available */}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={selectedItem?.status ? "Beschikbaar" : "Niet Beschikbaar"}
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
          categories={categories.map(c => c.name)}
          setCategories={cats => setCategories(
            cats.map(name => categories.find(c => c.name === name) || { name })
          )}
          onAddCategory={handleAddCategory}
          onRemoveCategory={handleRemoveCategory}
          onClose={() => setShowCategoryEditor(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default MenuEditStartPage;