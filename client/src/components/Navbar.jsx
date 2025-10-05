import React, { useState } from "react";
import { Button } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { selectCartCount } from "../redux/cartSlice";
import { logout } from "../redux/userSlice";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const cartCount = useSelector((state) => selectCartCount(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/categories" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-2xl font-bold text-primary">MyBrand</h1>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="text-gray-700 hover:text-primary font-medium transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hi, <span className="text-primary">{user.firstname}</span>
                </span>
                <Button
                  variant="outline"
                  color="primary"
                  onClick={() => navigate("/orders")}
                >
                  My Orders
                </Button>
                <Button variant="outline" color="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  color="primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
            <button
              className="relative text-gray-700 hover:text-primary border-2 rounded-full p-2 bg-amber-200 cursor-pointer"
              onClick={() => setIsCartOpen((s) => !s)}
              aria-label="Open cart"
            >
              <span className="text-2xl">
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="23px"
                  height="23px"
                  viewBox="0 0 902.86 902.86"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                      />
                      <path
                        d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                      />
                    </g>
                  </g>
                </svg>
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button
              className="relative text-gray-700"
              onClick={() => setIsCartOpen((s) => !s)}
              aria-label="Open cart"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.name}
              </button>
            ))}

            <div className="flex flex-col px-3 py-2 space-y-2">
              {user ? (
                <>
                  <Button
                    className="w-full"
                    variant="outline"
                    color="primary"
                    onClick={() => {
                      navigate("/orders");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    My Orders
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    color="danger"
                    onClick={() => {
                      dispatch(logout());
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full"
                    variant="outline"
                    color="primary"
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full"
                    variant="solid"
                    color="primary"
                    onClick={() => {
                      navigate("/register");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
}
