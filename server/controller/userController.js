const {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  getUserByEmailService,
  updateUserByIdService,
  deleteUserByIdService,
} = require("../models/users");
const { handleResponse } = require("../utils");
const bcrypt = require("bcryptjs");

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
    // basic validation: passwords must match
    if (!password || !confirmPassword || password !== confirmPassword) {
      return handleResponse(res, 400, "Passwords do not match or are missing");
    }

    // hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // do NOT store confirmPassword in DB; pass only hashed password
    const newUser = await createUserService(
      firstName,
      lastName,
      email,
      hashedPassword,
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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return handleResponse(res, 400, "Email and password are required");
    const user = await getUserByEmailService(email);
    if (!user) return handleResponse(res, 401, "Invalid credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleResponse(res, 401, "Invalid credentials");

    // create a copy without the password field
    const safeUser = { ...user };
    delete safeUser.password;
    handleResponse(res, 200, "Login successful", safeUser);
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
  login,
};
