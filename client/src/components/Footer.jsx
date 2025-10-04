import React from "react";
import { Button } from "@heroui/react";

export default function Footer() {
  const quickLinks = ["Home", "Shop", "Categories"];

  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Brand */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-primary">MyBrand</h1>
          <p className="text-gray-600">
            Your one-stop shop for all your favorite products. Bringing you the
            best online experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Quick Links</h2>
          {quickLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 text-gray-500 text-center py-4 mt-4">
        &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
}
