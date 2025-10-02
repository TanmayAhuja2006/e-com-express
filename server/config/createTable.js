const pool = require("../config/db");

const createUsersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirmPassword VARCHAR(255) NOT NULL,
    mobileNumber VARCHAR(15),
    address TEXT,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  try {
    await pool.query(queryText);
    console.log("Users table created successfully");
  } catch (err) {
    console.error("Error creating users table", err);
  }
};

module.exports = { createUsersTable };
