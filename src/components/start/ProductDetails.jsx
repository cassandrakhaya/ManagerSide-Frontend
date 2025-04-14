import React, { useState, useEffect } from 'react';
import ImageUploader from '../start/AfbeeldingUpload';

const ProductDetails = ({ selectedItem }) => {
    const [selectedCategory, setSelectedCategory] = useState("Lunch");
    const [selectedName, setSelectedName] = useState("Name");
    const [selectedPrice, setSelectedPrice] = useState("Price");
    const [selectedDescription, setSelectedDescription] = useState("Description");


    useEffect(() => {
        if (selectedItem?.category) {
            setSelectedCategory(selectedItem.category);
        }
    }, [selectedItem]);

    return (
        <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 ml-4">
            <h2 className="text-2xl font-bold mb-4">Product details</h2>
            
            <div className="flex">
                <div className="w-1/2">
                    <label className="block text-gray-700">Name</label>
                    <input
                        className="w-full p-2 border rounded"
                        value = {selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                    />
                    
                    <label className="block text-gray-700">Price</label>
                    <input className="w-full p-2 border rounded mb-4" value={selectedItem?.price || ""}  />

                    <label className="block text-gray-700">Category</label>
                    <select 
                        className="w-full p-2 border rounded" 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Desserts">Desserts</option>
                    </select>

                    <label className="block text-gray-700 mt-4">Product description</label>
                    <textarea className="w-full p-2 border rounded" value={selectedItem?.description || ""}  />
                </div>

                <div className="w-1/2 flex flex-col items-center">
                    <ImageUploader />
                </div>
            </div>

            <label className="block text-gray-700 mt-4">Status</label>
            <select className="w-full p-2 border rounded">
                <option>Available</option>
                <option>Out of Stock</option>
            </select>

            <button className="bg-blue-500 text-white p-2 rounded w-full mt-4">Save</button>
        </div>
    );
};

export default ProductDetails;
