import React from 'react';

const DeckComponent = ({ deck }) => {
  return (
    <div>
      <h2>Deck List</h2>
        <div className='grid sm:grid-cols-2 gap-12'>
        {deck.map((card, index) => (
          <div key={index}>
            {card.name} {card.color || ''} {card.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckComponent;