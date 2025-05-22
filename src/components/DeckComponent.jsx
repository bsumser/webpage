import React from 'react';
import ColorPie from './ColorPie'; // Import DeckComponent

const DeckComponent = ({ deck }) => (
  <div>
    <h2>Deck List</h2>
    <div className="grid sm:grid-cols-2 gap-4 text-sm leading-tight">
      {deck.map((card, i) => (
        <div key={i} className="p-1">
          <span className="font-semibold">{card.name}</span>, {card.color || 'Colorless'}, {card.type}
        </div>
      ))}
    </div>
      <div>
        {deck && <ColorPie width={300} height={300} deck={deck} />}
      </div>
  </div>
);

export default DeckComponent;
