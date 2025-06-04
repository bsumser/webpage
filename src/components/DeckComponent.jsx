import React from 'react';
import ColorPie from './ColorPie'; // Import ColorPie component
import ManaCurve from './ManaCurve'; // Import ManaCurve component

const DeckComponent = ({ deck }) => (
  <div>
    <h2>Deck List</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-tight">
      {deck.map((card, i) => (
        <div key={i} className="p-2 rounded-md shadow-sm bg-gray-100 border border-gray-200">
          <span className="font-bold">{card.count || 1}x {card.name}</span>
            <div>Cost: {card.manacost ? card.manacost.replaceAll('{', '').replaceAll('}', '') : 'N/A'}</div>
          <div>Type: {card.type}</div>
          {/* --- THIS LINE IS CORRECTED --- */}
          <div>
            Color: {
              card.colors && Array.isArray(card.colors)
                ? card.colors.join(', ')
                : card.colors || 'Colorless'
            }
          </div>
        </div>
      ))}
    </div>
    {/* 2. Add a new section for charts */}
    <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Deck Analysis</h2>
        <div className="flex flex-wrap gap-8 items-end">
            <div>
                <h3 className="text-lg font-semibold text-center">Color Distribution</h3>
                {deck && <ColorPie width={300} height={300} deck={deck} />}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-center">Mana Curve</h3>
                {deck && <ManaCurve width={450} height={300} deck={deck} />}
            </div>
        </div>
    </div>
  </div>
);

export default DeckComponent;