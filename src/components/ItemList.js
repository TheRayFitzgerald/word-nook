export default function ItemList({ items, onDelete }) {
  return (
    <div className="w-full sm:w-3/4 3xl:w-1/2 max-w-screen-md lg:max-w-screen-lg">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col p-5 m-3 bg-gray-100 rounded-md shadow-lg"
        >
          <h2 className="text-2xl font-serif text-gray-700">{item.word}</h2>
          <p className="mt-4 text-gray-600">{item.definition}</p>
          {/*
          <button 
            onClick={() => onDelete(item)}
            className="mt-4 text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
          >
            &times;
          </button>
      */}
        </div>
      ))}
    </div>
  );
}