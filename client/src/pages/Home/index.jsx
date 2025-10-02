import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl"
      >
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="https://media.istockphoto.com/id/1127293327/photo/office-tabletop-online-shopresponsive-design-website.jpg?s=612x612&w=0&k=20&c=RYPVS6HdwflFP0rSwaYqkHV_zV9HAGfCQIPamjPpbqw="
            alt="Shopping bags"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to <span className="text-indigo-600">E-Com Express</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Your one-stop destination for the best shopping experience.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate("/register")}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md transition hover:bg-indigo-700"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-semibold shadow-md transition hover:bg-indigo-50"
            >
              Already have an account? Log In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
