import React from "react";
import ProductCard from "../../components/ProductCard";

export default function AllProducts() {
  const allProductsData = [
    {
      id: 1,
      title: "Sneakers",
      price: 49.99,
      oldPrice: 69.99,
      rating: 4,
      image:
        "https://images.pexels.com/photos/15113597/pexels-photo-15113597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Headphones",
      price: 79.99,
      oldPrice: 99.99,
      rating: 5,
      image:
        "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Backpack",
      price: 39.99,
      oldPrice: 49.99,
      rating: 4,
      image:
        "https://images.pexels.com/photos/3747466/pexels-photo-3747466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          All Products
        </h1>
        <p className="text-gray-600 text-lg">
          Browse our wide selection of products and find what you love.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProductsData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => alert(`Added ${product.title} to cart!`)}
            onQuickView={() => alert(`Quick view: ${product.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
