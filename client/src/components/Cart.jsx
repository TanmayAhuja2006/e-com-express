import React from "react";
import { Button } from "@heroui/react";

export default function Cart({
  items = [],
  onRemove = (id) => {},
  onQuantityChange = (id, qty) => {},
  onCheckout = () => {},
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-20">Your cart is empty!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <Button
                color="danger"
                variant="outline"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-white rounded-lg shadow-md">
            <span className="text-xl font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </span>
            <Button
              color="primary"
              variant="solid"
              onClick={onCheckout}
              className="mt-2 md:mt-0"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
