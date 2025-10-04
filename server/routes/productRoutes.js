const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
} = require("../controller/productCategoriesController");

router.post("/add-category", addCategory);
router.get("/all-categories", getAllCategories);

module.exports = router;
