import { useState, type ChangeEvent, type FormEvent } from 'react';
import SEO from './SEO.tsx';
import Puzzle from './Puzzle.tsx';

export interface WordData {
  word: string;
  kanji: string;
}

export default function Crossword() {
  const [apiKey, setApiKey] = useState('');
  const [puzzleData, setPuzzleData] = useState<WordData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/crossword/key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: apiKey }),
      });
    
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }
    
      // Inside handleSubmit in Crossword.tsx:
      const data: { key: string } = await response.json();
      console.log('Returned Key:', data.key);
          
      // Call setPuzzleData to use the setter function
      // (Replace this with real API puzzle data once your backend constructs it)
      setPuzzleData([
        { word: "key", kanji: data.key }
      ]);
    
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEO
        title="Crossword Puzzle Builder"
        description="Build your own crossword puzzle using your WaniKani API key."
        canonical="https://tsumser.jp/crossword"
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <label htmlFor="wk-key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            WaniKani API Key
          </label>
          <input
            id="wk-key"
            type="password"
            value={apiKey}
            onChange={handleInputChange}
            placeholder="Enter WaniKani API key..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
          <button
            type="submit"
            disabled={loading || !apiKey.trim()}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Fetch Puzzle'}
          </button>
        </form>

        <div className="w-full max-w-4xl mt-6">
          {error && <p className="text-red-400 text-center font-medium">Error: {error}</p>}
          {!loading && puzzleData.length > 0 && <Puzzle puzzle={puzzleData} />}
        </div>
      </div>
    </div>
  );
}