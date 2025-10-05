import React from "react";
import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart({ onClose = () => {} }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const navigate = useNavigate();

  const handleRemove = (id) => dispatch(removeItem(id));
  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, quantity: qty }));
  };
  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative w-full sm:w-[480px] max-w-full h-full bg-white shadow-2xl overflow-auto p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-20">Your cart is empty!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Button
                    color="danger"
                    variant="outline"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                  <span className="text-sm font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-4 p-4 bg-white rounded-lg shadow flex flex-col gap-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">Total</span>
                <span className="text-lg font-bold">
                  ₹{Number(total || 0).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 flex-col sm:flex-row">
                <Button
                  color="primary"
                  variant="solid"
                  onClick={handleCheckout}
                  className="flex-1"
                >
                  Checkout
                </Button>
                <Button
                  color="danger"
                  variant="outline"
                  onClick={() => dispatch(clearCart())}
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
