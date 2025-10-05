const pool = require("../config/db");

const AddOrderService = async (user_id, total_amount, status) => {
  const response = await pool.query(
    "INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *",
    [user_id, total_amount, status]
  );
  return response.rows[0];
};
const GetAllOrdersService = async () => {
  const response = await pool.query("SELECT * FROM orders");
  return response.rows;
};
const GetOrderByIdService = async (id) => {
  const response = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);
  return response.rows[0];
};
const UpdateOrderByIdService = async (user_id, total_amount, status, id) => {
  const response = await pool.query(
    "UPDATE orders SET user_id=$1, total_amount=$2, status=$3 WHERE id=$4 RETURNING *",
    [user_id, total_amount, status, id]
  );
  return response.rows[0];
};
const DeleteOrderByIdService = async (id) => {
  const response = await pool.query(
    "DELETE FROM orders WHERE id=$1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

const GetOrdersByUserIdService = async (user_id) => {
  const response = await pool.query("SELECT * FROM orders WHERE user_id=$1", [
    user_id,
  ]);
  return response.rows;
};

module.exports = {
  AddOrderService,
  GetAllOrdersService,
  GetOrderByIdService,
  UpdateOrderByIdService,
  DeleteOrderByIdService,
  GetOrdersByUserIdService,
};
