import { Icon } from "@iconify/react";

export default function ItemCard({ item, onMemorize }) {
  return (
    // Set the outer div to be a flex container with items centered vertically
    <div
      className={`flex flex-row items-center p-5 m-3 bg-gray-100 rounded-md shadow-md relative ${
        item.isWordOfTheDay ? "gradient-border" : ""
      }`}
    >
      {/* Left side: word and definition in a column */}
      <div className="flex-grow">
        <h2 className="text-2xl font-serif text-gray-700">
          {item.isWordOfTheDay ? (
            <span className="font-bold">📌 Word of the Day: </span>
          ) : (
            ""
          )}
          {item.word}
        </h2>
        <p className="mt-4 text-gray-600">{item.definition}</p>
      </div>

      {/* Right side: memorize button, centered vertically */}
      {!item.memorized && (
        <div
          onClick={() => onMemorize(item)}
          class="w-12 h-12 flex-shrink-0 ml-2 bg-gray-700 rounded-full cursor-pointer select-none
active:translate-y-1  active:[box-shadow:0_0px_0_0_#6b7280,0_0px_0_0_#6b7280]
active:border-b-[0px]
transition-all duration-150 [box-shadow:0_4px_0_0_#6b7280,0_6px_0_0_#6b7280]
border-[1px] border-gray-600
"
        >
          <span class="flex flex-col justify-center items-center h-full text-white font-bold text-3xl ">
            <Icon icon="mdi:brain" />
          </span>
        </div>
      )}
    </div>
  );
}
