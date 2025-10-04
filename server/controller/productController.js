const {
  addProductService,
  getAllProductsByCategoryService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} = require("../models/products");

const { handleResponse } = require("../utils");

const addProduct = async (req, res, next) => {
  const {
    name,
    description,
    price,
    stock_quantity,
    product_image,
    category_id,
  } = req.body;
  try {
    const newProduct = await addProductService(
      name,
      description,
      price,
      stock_quantity,
      product_image,
      category_id
    );
    handleResponse(res, 201, "Product added successfully", newProduct);
  } catch (err) {
    next(err);
  }
};

const getAllProductsByCategory = async (req, res, next) => {
  try {
    const allProducts = await getAllProductsByCategoryService();
    handleResponse(res, 200, "All products fetched successfully", allProducts);
  } catch (err) {
    next(err);
  }
};
const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fetchedProduct = await getProductByIdService(id);
    if (!fetchedProduct) {
      return handleResponse(res, 404, "Product not found");
    }
    handleResponse(res, 200, "Product fetched successfully", fetchedProduct);
  } catch (err) {
    next(err);
  }
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    stock_quantity,
    product_image,
    category_id,
  } = req.body;
  try {
    const updatedProduct = await updateProductByIdService(
      name,
      description,
      price,
      stock_quantity,
      product_image,
      category_id,
      id
    );
    if (!updatedProduct) {
      return handleResponse(res, 404, "Product not found");
    }
    handleResponse(res, 200, "Product updated successfully", updatedProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProductByIdService(id);
    if (!deletedProduct) {
      return handleResponse(res, 404, "Product not found");
    }
    handleResponse(res, 200, "Product deleted successfully", deletedProduct);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  getAllProductsByCategory,
  getProductById,
  updateProductById,
  deleteProductById,
};
