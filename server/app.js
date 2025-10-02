const express = require("express");
const app = express();
const cors = require("cors");

// Express middlewares.
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes

module.exports = app;
