import React from "react";
import { Button } from "@heroui/react";

export default function ProductCard({
  product = {},
  onAddToCart = () => {},
  onQuickView = () => {},
  className = "",
}) {
  const { image, title, price, oldPrice, rating } = product;

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={onQuickView}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          🔍
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>

        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-lg">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {rating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
        )}

        <Button color="primary" variant="solid" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
