const pool = require("../config/db");

const addProductService = async (
  name,
  description,
  price,
  stock_quantity,
  product_image,
  category_id
) => {
  const response = await pool.query(
    "INSERT INTO products (name, description, price, stock_quantity, product_image, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, description, price, stock_quantity, product_image, category_id]
  );
  return response.rows[0];
};

const getAllProductsByCategoryService = async () => {
  const response = await pool.query(
    `SELECT p.*, c.name AS category_name 
         FROM products p
            JOIN product_categories c ON p.category_id = c.id`
  );
  return response.rows;
};

const getProductByIdService = async (id) => {
  const response = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
  return response.rows[0];
};

const updateProductByIdService = async (
  name,
  description,
  price,
  stock_quantity,
  product_image,
  category_id,
  id
) => {
  const response = await pool.query(
    "UPDATE products SET name=$1, description=$2, price=$3, stock_quantity=$4, product_image=$5, category_id=$6 WHERE id=$7 RETURNING *",
    [name, description, price, stock_quantity, product_image, category_id, id]
  );
  return response.rows[0];
};

const deleteProductByIdService = async (id) => {
  const response = await pool.query(
    "DELETE FROM products WHERE id=$1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

module.exports = {
  addProductService,
  getAllProductsByCategoryService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
};
