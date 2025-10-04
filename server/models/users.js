const pool = require("../config/db");

const getAllUsersService = async () => {
  const response = await pool.query("SELECT * FROM users");
  return response.rows;
};

const getUserByIdService = async (id) => {
  const response = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return response.rows[0];
};

const createUserService = async (
  firstName,
  lastName,
  email,
  password,
  mobileNumber,
  address,
  role
) => {
  const response = await pool.query(
    "INSERT INTO users (firstName, lastName, email, password, mobileNumber, address, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [firstName, lastName, email, password, mobileNumber, address, role]
  );
  return response.rows[0];
};

const updateUserByIdService = async (
  firstName,
  lastName,
  email,
  mobileNumber,
  address,
  id
) => {
  const response = await pool.query(
    "UPDATE users SET firstName=$1, lastName=$2, email=$3, mobile=$4, address=$5 WHERE id=$6 RETURNING *",
    [firstName, lastName, email, mobileNumber, address, id]
  );
  return response.rows[0];
};

const deleteUserByIdService = async (id) => {
  const response = await pool.query("DELETE FROM users WHERE id=$1", [id]);
  return response.rows[0];
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserByIdService,
  deleteUserByIdService,
};
