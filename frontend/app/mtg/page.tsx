import { MTG } from '@/components/mtg';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-500">
      <div className="max-w-[1040px] m-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-center text-[#001b5e] dark:text-blue-400 mb-6">
          Magic: The Gathering Deck API
        </h1>
        <div className="flex flex-col items-center justify-center rounded-lg p-4">
          <MTG />
        </div>
      </div>
    </div>
  );
}