import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetcher } from "../../utils/utils";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    async function getUserOrders() {
      if (!user) {
        setError("Please log in to view your orders");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetcher(`/orders/user/orders/${user.id}`);
        setOrders(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    getUserOrders();
  }, [user]);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (orders.length === 0)
    return (
      <p className="text-center py-20 text-gray-500">You have no orders yet.</p>
    );
  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          >
            <div>
              <h2 className="font-semibold text-lg">Order ID: {order.id}</h2>
              <p>
                Status: <span className="font-medium">{order.status}</span>
              </p>
              <p>
                Total Amount:{" "}
                <span className="font-bold">
                  ₹{Number(order.total_amount).toFixed(2)}
                </span>
              </p>
              <p>Ordered On: {new Date(order.created_at).toLocaleString()}</p>
            </div>

            <div className="flex flex-col md:items-end">
              <h3 className="font-semibold">Products:</h3>
              <ul className="list-disc ml-4">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} (₹
                    {(item.price * item.quantity).toFixed(2)})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
