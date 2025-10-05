import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { fetcher } from "../../utils/utils";
import { addItem } from "../../redux/cartSlice";

export default function ProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        const response = await fetcher(`/products/product/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [productId]);

  useEffect(() => {
    async function getRelatedProducts() {
      try {
        const response = await fetcher("/products/all-products");
        setRelatedProducts(
          response.data.filter((p) => p.id !== parseInt(productId))
        );
      } catch (err) {
        console.error("Failed to load related products:", err);
      }
    }

    getRelatedProducts();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.product_image,
        quantity,
      })
    );

    alert(`${product.name} added to cart! 🛒`);
  };

  if (loading) {
    return (
      <p className="p-8 text-center text-gray-500">
        Loading product details...
      </p>
    );
  }

  if (error || !product) {
    return (
      <p className="p-8 text-center text-red-500">
        {error || "Product not found!"}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <img
            src={product.product_image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">
              ₹{parseFloat(product.price).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < 4 ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
          {product.description && (
            <p className="text-gray-600 mt-4">{product.description}</p>
          )}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>
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
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                title: p.name,
                price: parseFloat(p.price),
                image: p.product_image,
              }}
              onAddToCart={() =>
                dispatch(
                  addItem({
                    id: p.id,
                    name: p.name,
                    price: parseFloat(p.price),
                    image: p.product_image,
                    quantity: 1,
                  })
                )
              }
              onQuickView={() => alert(`Quick view: ${p.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
