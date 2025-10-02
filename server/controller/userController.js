const {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
} = require("../models/users");
const { handleResponse } = require("../utils");

const createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    mobileNumber,
    address,
    role,
  } = req.body;
  try {
    const newUser = await createUserService(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      mobileNumber,
      address,
      role
    );
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUers = await getAllUsersService();
    handleResponse(res, 200, "All users fetched successfully", allUers);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fetchedUser = await getUserByIdService(id);
    if (!fetchedUser) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User fetched successfully", fetchedUser);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, mobileNumber, address } = req.body;
  try {
    const updatedUser = await updateUserByIdService(
      firstName,
      lastName,
      email,
      mobileNumber,
      address,
      id
    );
    if (!updatedUser) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fetchedUser = await deleteUserByIdService(id);
    if (!fetchedUser) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User deleted successfully", fetchedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
