import Card from './Card.tsx';
import ColorPie from './ColorPie.tsx';
import ManaCurve from './ManaCurve.tsx';

interface CardData {
  id?: string | number;
  name: string;
  count?: number;
  mana_cost?: string;
  image_url?: string;
}

interface DeckComponentProps {
  deck: CardData[];
}

export default function DeckComponent({ deck }: DeckComponentProps) {
  return (
    <div>
      <h2>Deck List</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-tight">
        {deck.map((card, index) => (
          <Card key={card.id ?? index} card={card} />
        ))}
      </div>
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
}
