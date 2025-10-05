import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../../redux/userSlice"; // adjust path
import { fetcher } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

export default function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await fetcher("/users/login", {
        method: "POST",
        body: formData,
      });
      const user = response.data;
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      // addToast({
      //   title: "Login Successful",
      //   description: "Welcome back!",
      //   color: "success",
      //   timeout: 3000,
      // });
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      dispatch(setError(err.message || "Login failed"));
      // addToast({
      //   title: "Login Failed",
      //   description: err.message || "Please check your credentials",
      //   color: "danger",
      // });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Log in to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded text-indigo-500 focus:ring-indigo-400"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-2 text-white font-semibold shadow-md transition hover:bg-indigo-700"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
