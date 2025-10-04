import React from "react";
import { Button } from "@heroui/react";

export default function OrderCard({
  orderId,
  orderDate,
  status,
  items = [],
  total,
  onView = () => {},
  onTrack = () => {},
  onCancel = () => {},
  className = "",
}) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 ${className}`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Order #{orderId}
        </h3>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            status === "Delivered"
              ? "bg-green-100 text-green-800"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-500 text-sm">Placed on: {orderDate}</p>

      <div className="flex flex-col gap-2 border-t border-b py-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-gray-700"
          >
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center font-semibold text-gray-800">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="flex gap-2 mt-2 flex-wrap">
        <Button variant="solid" color="primary" onClick={onView}>
          View
        </Button>
        {status === "Pending" && (
          <>
            <Button variant="outline" color="primary" onClick={onTrack}>
              Track
            </Button>
            <Button variant="outline" color="danger" onClick={onCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
