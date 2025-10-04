const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategories,
} = require("../controller/productCategoriesController");

const {
  addProduct,
  getAllProductsByCategory,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");

// product category routes
router.post("/add-category", addCategory);
router.get("/all-categories", getAllCategories);

// product routes
router.post("/add-product", addProduct);
router.get("/all-products", getAllProductsByCategory);
router.get("/product/:id", getProductById);
router.put("/update/product/:id", updateProductById);
router.delete("/delete/product/:id", deleteProductById);

module.exports = router;
