import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { fetcher } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await fetcher("/products/all-products");
        setProducts(response.data || []);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    getAllProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.product_image || product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          All Products
        </h1>
        <p className="text-gray-600 text-lg">
          Browse our wide selection of products and find what you love.
        </p>
      </div>
      {loading ? (
        <div className="text-center text-gray-600">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600">No products available.</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
              <ProductCard
                product={{
                  id: product.id,
                  title: product.name,
                  price: parseFloat(product.price),
                  oldPrice: parseFloat(product.price) + 1000,
                  rating: 4,
                  image: product.product_image,
                }}
                onAddToCart={(e) => handleAddToCart(product, e)}
                onQuickView={(e) => {
                  e.stopPropagation();
                  alert(`Quick view: ${product.name}`);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
