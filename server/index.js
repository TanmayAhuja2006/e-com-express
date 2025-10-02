const { Pool, Client } = require("pg");
const app = require("./app");
const path = require("path");

// setting up environment variables.
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "dev.env"),
});

// postgres pool setup.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// db test connection.
(async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT current_user");
    const current_user = rows[0]["current_user"];
    console.log(current_user);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
})();

// server setup.
app.listen(process.env.PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
