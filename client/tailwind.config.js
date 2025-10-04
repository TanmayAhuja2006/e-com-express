const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
