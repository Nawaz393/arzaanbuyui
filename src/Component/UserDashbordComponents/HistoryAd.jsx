import React, { useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
function HistoryAd({ ad }) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const handleNextImage = () => {
    if (currentImageIndex === ad.images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(ad.images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md my-4">
      <div className="relative">
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-25 hover:bg-opacity-50 text-white px-2 py-1 rounded-full shadow-md transition duration-200 ease-in-out"
          onClick={handlePrevImage}
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-25 hover:bg-opacity-50 text-white px-2 py-1 rounded-full shadow-md transition duration-200 ease-in-out"
          onClick={handleNextImage}
        >
          <FaChevronRight className="h-6 w-6" />
        </button>
        <img
          className="w-full h-64 object-cover"
          src={ad.images[currentImageIndex]}
          alt={ad.title}
        />
      </div>
      <div className="p-4">
        <p className="text-gray-600">{ad.description.slice(0, 100)}...</p>
        {expanded && (
          <div className="mt-4">
            <p className="text-gray-600">
              <strong>WhatsApp:</strong> {ad.whatsapp}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {ad.email}
            </p>
            <p className="text-gray-600">
              <strong>Website:</strong>{" "}
              <a
                href={ad.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {ad.website}
              </a>
            </p>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full sm:w-auto"
          onClick={handleExpand}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

export default HistoryAd;
