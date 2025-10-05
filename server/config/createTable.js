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

const createProductsTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_image TEXT,
    category_id INT REFERENCES product_categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  try {
    // ensure product_image column exists for existing tables
    await pool.query(
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS product_image TEXT"
    );
    await pool.query(queryText);
    console.log("Products table created successfully");
  } catch (err) {
    console.error("Error creating products table", err);
  }
};

const createOrderItemsTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  try {
    await pool.query(queryText);
    console.log("Order items table created successfully");
  } catch (err) {
    console.error("Error creating order items table", err);
  }
};

const createOrdersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  try {
    await pool.query(queryText);
    console.log("Orders table created successfully");
  } catch (err) {
    console.error("Error creating orders table", err);
  }
};

module.exports = {
  createUsersTable,
  createProductsCategoryTable,
  createProductsTable,
  createOrderItemsTable,
  createOrdersTable,
};
