import React from 'react';

// Temporary placeholder: image upload is disabled until backend support is available
const AfbeeldingUpload = () => {
  return (
    <div className="ml-6">
      <div className="w-48 h-28 bg-gray-100 rounded overflow-hidden mb-2 flex items-center justify-center text-gray-400">
        Geen afbeelding-ondersteuning
      </div>
      <button
        type="button"
        className="px-3 py-1 border border-gray-300 rounded text-sm bg-gray-200 cursor-not-allowed"
        disabled
      >
        Afbeelding Aanpassen (uitgeschakeld)
      </button>
    </div>
  );
};

export default AfbeeldingUpload;
