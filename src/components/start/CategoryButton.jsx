import React from 'react';

const CategoryButton = ({ text, onClick }) => {
    return (
      <button
          onClick={onClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold shadow-md transition hover:bg-blue-700"
      >
          {text}
      </button>
    );
  }
  export default CategoryButton;