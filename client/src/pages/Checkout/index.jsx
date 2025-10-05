import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../redux/cartSlice";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../../utils/utils";

export default function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    try {
      if (!user) throw new Error("User not logged in");
      const response = await fetcher("/orders/add-order", {
        method: "POST",
        body: {
          user_id: user.id,
          total_amount: total,
          status: "pending",
        },
      });
      setSuccess("Order placed successfully!");
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0)
    return (
      <p className="text-center py-20 text-gray-500">Your cart is empty!</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <div className="flex flex-col gap-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{Number(item.price).toFixed(2)}</p>
              </div>
            </div>
            <span className="font-semibold">Qty: {item.quantity}</span>
            <span className="font-bold">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4">
        <span className="font-semibold text-lg">Total:</span>
        <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
      </div>

      <Button
        color="primary"
        variant="solid"
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
}
