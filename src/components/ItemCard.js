import { Icon } from "@iconify/react";

export default function ItemCard({ item, onMemorize }) {
  return (
    // Set the outer div to be a flex container with items centered vertically
    <div className="flex flex-row items-center p-5 m-3 bg-gray-100 rounded-md shadow-md relative">
      {/* Left side: word and definition in a column */}
      <div className="flex-grow">
        <h2 className="text-2xl font-serif text-gray-700">{item.word}</h2>
        <p className="mt-4 text-gray-600">{item.definition}</p>
      </div>

      {/* Right side: memorize button, centered vertically */}
      {item.memorized ? null : (
        <button
          onClick={() => onMemorize(item)}
          className="ml-4 text-gray-800 hover:text-gray-600 active:text-gray-900"
        >
          <Icon icon="mdi:brain" className="text-4xl" />
        </button>
      )}
    </div>
  );
}
