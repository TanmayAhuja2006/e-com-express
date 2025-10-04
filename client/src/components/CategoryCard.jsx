import React from "react";

export default function CategoryCard({
  category = {},
  onClick = () => {},
  className = "",
}) {
  const { name, image, itemCount } = category;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ${className}`}
    >
      {/* Image */}
      <div className="w-full h-40 overflow-hidden">
        {image && (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Category Info */}
      <div className="p-4 flex flex-col items-start gap-1">
        <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
        {itemCount !== undefined && (
          <span className="text-gray-500 text-sm">{itemCount} items</span>
        )}
      </div>
    </div>
  );
}
