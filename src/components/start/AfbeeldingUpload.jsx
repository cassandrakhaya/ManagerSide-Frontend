import React from 'react';

const AfbeeldingUpload = ({ selectedItem, setSelectedItem, fileInputRef, handleImageChange }) => {
  return (
    <div className="ml-6">
      <div className="w-48 h-28 bg-gray-100 rounded overflow-hidden mb-2">
        {selectedItem.imageUrl && (
          <img
            src={selectedItem.imageUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        type="button"
        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition active:scale-95"
        onClick={() => fileInputRef.current?.click()}
      >
        Afbeelding Aanpassen
      </button>
    </div>
  );
};

export default AfbeeldingUpload;
