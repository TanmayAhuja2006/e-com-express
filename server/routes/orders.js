const express = require("express");
const router = express.Router();

const {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderForUser,
} = require("../controller/orderController");

router.post("/add-order", addOrder);
router.get("/all-orders", getAllOrders);
router.get("/order/:id", getOrderById);
router.put("/update/order/:id", updateOrderById);
router.delete("/delete/order/:id", deleteOrderById);
router.get("/user/orders/:id", getOrderForUser);

module.exports = router;
