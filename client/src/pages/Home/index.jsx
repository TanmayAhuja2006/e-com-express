import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { homeSlidesData } from "../../utils/utils";
import CustomSwiper from "../../common-components/CustomSwiper";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Get your orders delivered quickly at your doorstep.",
    },
    {
      icon: "💎",
      title: "Top Quality",
      description: "All products are carefully selected for quality.",
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days of purchase.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Swiper Section */}
      <CustomSwiper
        slides={homeSlidesData.map((slide) => ({
          image: slide.image,
          title: slide.title,
          description: slide.subTitle,
        }))}
        slidesPerView={1}
        autoplay
        loop
      />

      {/* Feature Cards Section */}
      <div className="py-12 bg-gray-50 px-4">
        <div className="cursor-pointer max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
        >
          Shop the Best Products Today!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg mb-6"
        >
          Discover quality products and enjoy a seamless shopping experience.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => navigate("/products")}
          className="px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Shop Now
        </motion.button>
      </div>
    </div>
  );
}
