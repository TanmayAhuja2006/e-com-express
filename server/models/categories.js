const pool = require("../config/db");

const addCategoryService = async (name, description) => {
  const response = await pool.query(
    "INSERT INTO product_categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return response.rows[0];
};

const getAllCategoriesService = async () => {
  const response = await pool.query("SELECT * FROM product_categories");
  return response.rows;
};

module.exports = {
  addCategoryService,
  getAllCategoriesService,
};
