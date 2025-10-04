import React, { useState } from "react";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/" },
  ];

  const buttons = [
    { name: "Login", path: "/login", variant: "outline" },
    { name: "Register", path: "/register", variant: "solid" },
  ];

  const navigate = (path) => {
    window.location.href = path; // Simple navigation without react-router
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-2xl font-bold text-primary">MyBrand</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
            {buttons.map((btn) => (
              <Button
                key={btn.name}
                variant={btn.variant}
                color="primary"
                onClick={() => navigate(btn.path)}
              >
                {btn.name}
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="flex flex-col px-3 py-2 space-y-2">
              {buttons.map((btn) => (
                <Button
                  key={btn.name}
                  variant={btn.variant}
                  color="primary"
                  className="w-full"
                  onClick={() => {
                    navigate(btn.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {btn.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
