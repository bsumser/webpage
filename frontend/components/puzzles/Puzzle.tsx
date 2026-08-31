// Puzzle.tsx
import type { WordData } from './Crossword.tsx';

interface PuzzleProps {
  puzzle: WordData[];
}

export default function Puzzle({ puzzle }: PuzzleProps) {
  return (
    <div id="puzzle" className="max-w-[1040px] m-auto p-4 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-[#001b5e] dark:text-blue-400 mb-6">Crossword Puzzle</h1>
      <div className="flex flex-wrap gap-4 items-center justify-start">
        {puzzle.map((item, index) => (
          <div key={index} className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700">
            <span className="font-bold text-lg dark:text-white">{item.kanji}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">({item.word})</span>
          </div>
        ))}
      </div>
    </div>
  );
}