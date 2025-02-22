import React from 'react';

function HouseCard({ image, title, description, pricePerNight }) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden  hover:shadow-xl transition-shadow duration-300">
      <img className="w-full h-72 object-cover rounded-lg" src={image} alt={title} />
      <div className="px-6 py-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-1 pb-2">
        <span className="inline-block py-1 text-sm font-bold text-black-700">
          ${pricePerNight} 
        </span> per night
      </div>
    </div>
  );
}

export default HouseCard;