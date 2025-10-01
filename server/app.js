const express = require("express");
const app = express();

// Express middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

module.exports = app;
