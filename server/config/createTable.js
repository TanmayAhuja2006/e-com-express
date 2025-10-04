const pool = require("../config/db");

const createUsersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobileNumber VARCHAR(15),
    address TEXT,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  try {
    await pool.query(`DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='confirmpassword') THEN
          EXECUTE 'ALTER TABLE users DROP COLUMN confirmpassword';
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='confirmPassword') THEN
          EXECUTE 'ALTER TABLE users DROP COLUMN "confirmPassword"';
        END IF;
      END
      $$;`);

    await pool.query(queryText);
    console.log("Users table created successfully");
  } catch (err) {
    console.error("Error creating users table", err);
  }
};

const createProductsCategoryTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  try {
    await pool.query(queryText);
    console.log("Product categories table created successfully");
  } catch (err) {
    console.error("Error creating product categories table", err);
  }
};

module.exports = { createUsersTable, createProductsCategoryTable };
