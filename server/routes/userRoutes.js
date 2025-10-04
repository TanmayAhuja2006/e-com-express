const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
} = require("../controller/userController");

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/all-users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/update/user/:id", updateUserById);
router.delete("/delete/user/:id", deleteUserById);

module.exports = router;
