const {
  addCategoryService,
  getAllCategoriesService,
} = require("../models/categories");

const { handleResponse } = require("../utils");

const addCategory = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const newCategory = await addCategoryService(name, description);
    handleResponse(res, 201, "Category added successfully", newCategory);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await getAllCategoriesService();
    handleResponse(
      res,
      200,
      "All categories fetched successfully",
      allCategories
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { addCategory, getAllCategories };
