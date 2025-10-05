const {
  addOrderItemService,
  getOrderItemsByOrderIdService,
} = require("../models/orderItems");

const { handleResponse } = require("../utils");

const addOrderItem = async (req, res, next) => {
  const { order_id, product_id, quantity, price } = req.body;
  try {
    const newOrderItem = await addOrderItemService(
      order_id,
      product_id,
      quantity,
      price
    );
    handleResponse(res, 201, "Order item added successfully", newOrderItem);
  } catch (err) {
    next(err);
  }
};
const getOrderItemsByOrderId = async (req, res, next) => {
  const { order_id } = req.params;
  try {
    const orderItems = await getOrderItemsByOrderIdService(order_id);
    handleResponse(res, 200, "Order items fetched successfully", orderItems);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addOrderItem,
  getOrderItemsByOrderId,
};
