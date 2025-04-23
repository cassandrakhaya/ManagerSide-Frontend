import React, { useState, useEffect } from 'react';
import ImageUploader from '../start/AfbeeldingUpload';

const ProductDetails = ({ selectedItem }) => {
    const [selectedCategory, setSelectedCategory] = useState("Lunch");
    const [selectedName, setSelectedName] = useState("Name");
    const [selectedPrice, setSelectedPrice] = useState("Price");
    const [selectedDescription, setSelectedDescription] = useState("Description");

    useEffect(() => {
        if (selectedItem?.category) setSelectedCategory(selectedItem.category);
        if (selectedItem?.name) setSelectedName(selectedItem.name);
        if (selectedItem?.price) setSelectedPrice(selectedItem.price);
        if (selectedItem?.description) setSelectedDescription(selectedItem.description);
    }, [selectedItem]);

    return (
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <div className="flex">
                <div className="w-1/2 pr-6">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                    />

                    <label className="block text-gray-700 mb-1">Prijs</label>
                    <div className="flex items-center mb-4">
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            value={selectedPrice}
                            onChange={(e) => setSelectedPrice(e.target.value)}
                        />
                        <span className="ml-2">EUR</span>
                    </div>

                    <label className="block text-gray-700 mb-1">Categorie</label>
                    <div className="flex items-center mb-4">
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Desserts">Desserts</option>
                        </select>
                        <button className="ml-2 px-3 py-1 bg-blue-100 border border-blue-300 text-blue-700 rounded">+</button>
                    </div>

                    <label className="block text-gray-700 mb-1">Product description</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded h-24 mb-4"
                        value={selectedDescription}
                        onChange={(e) => setSelectedDescription(e.target.value)}
                    />

                    <label className="block text-gray-700 mb-1">Status</label>
                    <select className="w-full p-2 border border-gray-300 rounded mb-4">
                        <option>Available</option>
                        <option>Out of Stock</option>
                    </select>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                    <img
                        src="https://via.placeholder.com/300x150"
                        alt="Product Preview"
                        className="mb-4 rounded-lg border border-gray-300"
                    />
                    <ImageUploader />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
