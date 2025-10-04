const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "dev.env"),
});
const app = require("./app");
const pool = require("./config/db");

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

// Create tables if not exists
require("./config/createTable").createUsersTable();
require("./config/createTable").createProductsCategoryTable();
require("./config/createTable").createProductsTable();

// routes setup.
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/products", require("./routes/productRoutes"));
