import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AllProducts from "../pages/All-Products";
import ProductPage from "../pages/Product/ProductPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}
