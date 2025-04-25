import React, { useState } from 'react';

const ProductDetails = ({ selectedItem, setSelectedItem, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const addCategoryToProduct = () => {
    if (!selectedItem.categories?.includes(selectedCategory)) {
      const updatedCategories = [...(selectedItem.categories || []), selectedCategory];
      setSelectedItem({ ...selectedItem, categories: updatedCategories });
    }
  };

  return (
    <div className="flex-1 space-y-4">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          type="text"
          value={selectedItem.name}
          onChange={e =>
            setSelectedItem({ ...selectedItem, name: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="flex items-end">
        <div className="flex-1">
          <label className="block text-sm mb-1">Prijs</label>
          <input
            type="text"
            value={selectedItem.price.replace("€", "")}
            onChange={e =>
              setSelectedItem({ ...selectedItem, price: `€${e.target.value}` })
            }
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
        <span className="ml-2 mb-1 text-sm">EUR</span>
      </div>

      {/* Custom Category Selector + Button */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-grow">
          <label className="block font-semibold mb-1">Categorie</label>
          <select
            className="w-full border px-2 py-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories
              .filter(c => c !== "All")
              .map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
        <button
          onClick={addCategoryToProduct}
          className="mt-6 bg-blue-100 px-3 py-1 rounded text-xl font-bold hover:bg-blue-200 active:scale-95 transition"
        >
          +
        </button>
      </div>

      {/* Display added categories */}
      {selectedItem.categories?.length > 0 && (
        <div>
          <label className="block text-sm mb-1">Added Categories</label>
          <div className="flex flex-wrap gap-2">
            {selectedItem.categories.map((cat, i) => (
              <span
                key={i}
                className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm mb-1">Product description</label>
        <textarea
          rows={4}
          value={selectedItem.description}
          onChange={e =>
            setSelectedItem({ ...selectedItem, description: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
        />
      </div>
    </div>
  );
};

export default ProductDetails;


// import React from 'react';

// const ProductDetails = ({ selectedItem, setSelectedItem, addNewProduct, categories }) => {
//   return (
//     <div className="flex-1 space-y-4">
//       <div>
//         <label className="block text-sm mb-1">Name</label>
//         <input
//           type="text"
//           value={selectedItem.name}
//           onChange={e =>
//             setSelectedItem({ ...selectedItem, name: e.target.value })
//           }
//           className="w-full p-2 border border-gray-300 rounded text-sm"
//         />
//       </div>

//       <div className="flex items-end">
//         <div className="flex-1">
//           <label className="block text-sm mb-1">Prijs</label>
//           <input
//             type="text"
//             value={selectedItem.price.replace("€", "")}
//             onChange={e =>
//               setSelectedItem({ ...selectedItem, price: `€${e.target.value}` })
//             }
//             className="w-full p-2 border border-gray-300 rounded text-sm"
//           />
//         </div>
//         <span className="ml-2 mb-1 text-sm">EUR</span>
//       </div>

//       <div className="flex items-end">
//         <div className="flex-1">
//           <label className="block text-sm mb-1">Categorie</label>
//           <select
//             value={selectedItem.category}
//             onChange={e =>
//               setSelectedItem({ ...selectedItem, category: e.target.value })
//             }
//             className="w-full p-2 border border-gray-300 rounded text-sm"
//           >
//             {categories.filter(c => c !== "All").map(c => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           type="button"
//           onClick={addNewProduct}
//           className="w-8 h-8 ml-2 flex items-center justify-center bg-blue-100 border border-gray-300 rounded text-gray-700 hover:bg-blue-200 active:scale-95 transition"
//         >
//           +
//         </button>
//       </div>

//       <div>
//         <label className="block text-sm mb-1">Product description</label>
//         <textarea
//           rows={4}
//           value={selectedItem.description}
//           onChange={e =>
//             setSelectedItem({ ...selectedItem, description: e.target.value })
//           }
//           className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
