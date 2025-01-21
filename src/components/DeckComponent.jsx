import React from 'react';

const DeckComponent = ({ deck }) => {
  return (
    <div>
      <h2>Deck List</h2>
      <ul>
        {deck.map((card, index) => (
          <li key={index}>
            {card.name} - {card.color || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckComponent;