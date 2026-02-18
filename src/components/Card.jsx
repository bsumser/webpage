import React from 'react'

const Card = ({ card, i }) => {
  // Use the direct image_url string from your new JSON format
  // We check if it's truthy (not null or empty string)
  const imageUrl = card.image_url && card.image_url !== "" ? card.image_url : null;

  return (
    <div className="relative group p-2 rounded-md shadow-sm bg-gray-100 border border-gray-200">
      
      <div className="space-y-1">
        {/* card.name matches your JSON */}
        <p className="font-bold">{card.count || 1}x {card.name}</p>
        
        {/* Updated to mana_cost (snake_case) to match Go JSON tags */}
        <p className="text-sm text-gray-600">
          Cost: {card.mana_cost ? card.mana_cost.replaceAll(/[{}]/g, '') : 'N/A'}
        </p>
      </div>

      {/* Tooltip Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={card.name}
          className="
            absolute z-50 top-0 left-full ml-4 w-52 md:w-60
            hidden group-hover:block          
            rounded-xl shadow-2xl border-2 border-gray-400
            pointer-events-none
            transition-all duration-200
          "
        />
      )}
    </div>
  );
}

export default Card;