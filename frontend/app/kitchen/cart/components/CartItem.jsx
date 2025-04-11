export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg mb-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-md"
      />

      <div className="flex-grow">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
          className="border rounded p-1"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 px-2 py-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
