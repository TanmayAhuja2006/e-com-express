const express = require("express");
const router = express.Router();

const {
  addOrderItem,
  getOrderItemsByOrderId,
} = require("../controller/orderItemsController");

router.post("/add-order-item", addOrderItem);
router.get("/order-items/:order_id", getOrderItemsByOrderId);

module.exports = router;
