import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AllProducts from "../pages/All-Products";
import ProductPage from "../pages/Product/ProductPage";
import CheckoutPage from "../pages/Checkout";
import MyOrdersPage from "../pages/My-Orders";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<MyOrdersPage />} />
    </Routes>
  );
}
