import React from 'react'

const Card = ({card, i}) => {
    // It now has access to the *entire* card object and can use any of its properties.
  const imageUrl = (card.artUrls && card.artUrls.length > 0) ? card.artUrls[0] : null;

  return (
    <div className="relative group p-2 rounded-md shadow-sm bg-gray-100 border border-gray-200">
      
      {/* Accessing properties from the passed-in card object */}
      <div className="space-y-1">
        <p className="font-bold">{card.count || 1}x {card.name}</p>
        <p>Cost: {card.manacost ? card.manacost.replaceAll(/[{}]/g, '') : 'N/A'}</p>
        <p>Type: {card.type}</p>
        <p>
          Color: {
            (card.colors && Array.isArray(card.colors) && card.colors.length > 0)
              ? card.colors.join(', ')
              : 'Colorless'
          }
        </p>
      </div>

      {/* The tooltip also uses a property from the card object */}
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

export default Card