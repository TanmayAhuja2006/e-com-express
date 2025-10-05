const pool = require("../config/db");

const addOrderItemService = async (order_id, product_id, quantity, price) => {
  const response = await pool.query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
    [order_id, product_id, quantity, price]
  );
  return response.rows[0];
};

const getOrderItemsByOrderIdService = async (order_id) => {
  const response = await pool.query(
    "SELECT * FROM order_items WHERE order_id=$1",
    [order_id]
  );
  return response.rows;
};

module.exports = {
  addOrderItemService,
  getOrderItemsByOrderIdService,
};
