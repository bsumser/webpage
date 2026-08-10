import { useState, type ChangeEvent, type FormEvent } from 'react';
import DeckComponent from './DeckComponent.tsx';

interface DeckCard {
  id?: string | number;
  name: string;
  count?: number;
  mana_cost?: string;
  image_url?: string;
  colors?: string;
  manavalue?: number | null;
}

export default function MTG() {
  const [deckData, setDeckData] = useState<DeckCard[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    fetch(`https://api.bsumser.dev/mtg/deck?deck=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData: { error?: string }) => {
            throw new Error(errorData.error || `API error: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDeckData(data as DeckCard[]);
        } else {
          setError(new Error('Invalid deck data format from API.'));
          setDeckData([]);
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(new Error(message));
        setDeckData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex-col items-center justify-center bg-gray-500">
      <form onSubmit={handleSubmit}>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          MTG Deck
        </label>
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          id="message"
          rows={30}
          cols={100}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter deck query here..."
        />
        <hr />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Deck'}
        </button>
      </form>
      <div className="flex items-center justify-center">
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
        {deckData.length > 0 && !error && <DeckComponent deck={deckData} />}
      </div>
    </div>
  );
}