import ItemCard from "./ItemCard";

export default function ItemList({ items, onMemorize }) {
  const notMemorizedItems = items.filter((item) => !item.memorized);
  const memorizedItems = items.filter((item) => item.memorized);

  return (
    <div className="w-full sm:w-3/4 3xl:w-1/2 max-w-screen-md lg:max-w-screen-lg">
      {notMemorizedItems.map((item, index) => (
        <ItemCard key={index} item={item} onMemorize={onMemorize} />
      ))}
      {memorizedItems.length > 0 && (
        <details>
          <summary className="text-2xl font-serif text-gray-700">
            Archive
          </summary>
          {memorizedItems.map((item, index) => (
            <ItemCard key={index} item={item} onMemorize={onMemorize} />
          ))}
        </details>
      )}
    </div>
  );
}
