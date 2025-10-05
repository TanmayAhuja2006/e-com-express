const {
  GetAllOrdersService,
  GetOrderByIdService,
  AddOrderService,
  UpdateOrderByIdService,
  DeleteOrderByIdService,
  GetOrdersByUserIdService,
} = require("../models/orders");

const { handleResponse } = require("../utils");

const addOrder = async (req, res, next) => {
  const { user_id, total_amount, status } = req.body;
  try {
    const newOrder = await AddOrderService(user_id, total_amount, status);
    handleResponse(res, 201, "Order added successfully", newOrder);
  } catch (err) {
    next(err);
  }
};
const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await GetAllOrdersService();
    handleResponse(res, 200, "All orders fetched successfully", allOrders);
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fetchedOrder = await GetOrderByIdService(id);
    if (!fetchedOrder) {
      return handleResponse(res, 404, "Order not found");
    }
    handleResponse(res, 200, "Order fetched successfully", fetchedOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderById = async (req, res, next) => {
  const { id } = req.params;
  const { user_id, total_amount, status } = req.body;
  try {
    const updatedOrder = await UpdateOrderByIdService(
      user_id,
      total_amount,
      status,
      id
    );
    if (!updatedOrder) {
      return handleResponse(res, 404, "Order not found");
    }
    handleResponse(res, 200, "Order updated successfully", updatedOrder);
  } catch (err) {
    next(err);
  }
};
const deleteOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedOrder = await DeleteOrderByIdService(id);
    if (!deletedOrder) {
      return handleResponse(res, 404, "Order not found");
    }
    handleResponse(res, 200, "Order deleted successfully", deletedOrder);
  } catch (err) {
    next(err);
  }
};

const getOrderForUser = async (req, res, next) => {
  // route is defined as /user/orders/:id, so use `id` param
  const { id } = req.params;
  try {
    const userOrders = await GetOrdersByUserIdService(id);
    if (!userOrders || userOrders.length === 0) {
      return handleResponse(res, 404, "No orders found for this user");
    }
    handleResponse(res, 200, "User orders fetched successfully", userOrders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderForUser,
};
