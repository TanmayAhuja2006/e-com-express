import React, { useState } from "react";
import { Button } from "@heroui/react";
import { useParams } from "react-router-dom";
import { allProductsData } from "../../utils/utils";
import ProductCard from "../../components/ProductCard";

export default function ProductPage() {
  const { productId } = useParams();

  const product = allProductsData.find((p) => p.id === parseInt(productId));

  const [quantity, setQuantity] = useState(1);

  if (!product) return <p className="p-8 text-center">Product not found!</p>;

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.title}(s) to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          {/* Optional thumbnails */}
          {/* <div className="flex gap-2">
            {product.thumbnails?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                className="w-20 h-20 object-cover rounded cursor-pointer"
              />
            ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {product.title}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < product.rating ? "text-yellow-400" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-gray-600 mt-4">{product.description}</p>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <Button
            color="primary"
            variant="solid"
            onClick={handleAddToCart}
            className="mt-4 w-full md:w-auto"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProductsData
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={() => alert(`Added ${p.title} to cart!`)}
                onQuickView={() => alert(`Quick view: ${p.title}`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
