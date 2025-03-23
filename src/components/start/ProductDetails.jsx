import React from 'react';

const ProductDetails = ({ selectedItem, selectedCategory }) => {
    return (
        <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 ml-4">
            <h2 className="text-2xl font-bold mb-4">Product details</h2>
            
            <div className="flex">
                <div className="w-1/2">
                    <label className="block text-gray-700">Name</label>
                    <input className="w-full p-2 border rounded mb-4" value={selectedItem?.name || ""} readOnly />

                    <label className="block text-gray-700">Price</label>
                    <input className="w-full p-2 border rounded mb-4" value={selectedItem?.price || ""} readOnly />

                    <label className="block text-gray-700">Category</label>
                    <input className="w-full p-2 border rounded mb-4" value={selectedCategory} readOnly />

                    <label className="block text-gray-700">Product description</label>
                    <textarea className="w-full p-2 border rounded" value={selectedItem?.description || ""} readOnly />
                </div>

                <div className="w-1/2 flex flex-col items-center">
                    <img className="w-full h-40 object-cover rounded mb-4" src="https://via.placeholder.com/300" alt="Product" />
                    <button className="bg-gray-300 text-gray-700 p-2 rounded">Change Image</button>
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
