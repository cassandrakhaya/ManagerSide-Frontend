import React, { useRef, useState } from 'react';

const ImageUploader = () => {
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  return (
    <div className="w-1/2 flex flex-col items-center">
      <img
        className="w-full h-40 object-cover rounded mb-4"
        src={imagePreview}
        alt="Product Preview"
      />
      <button
        className="bg-gray-300 text-gray-700 p-2 rounded"
        onClick={() => fileInputRef.current.click()}
      >
        Change Image
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={uploadImage}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;
