import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

// Simple async wrapper for cleaner code
const tryCatch = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    console.error("Controller Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// -------------------------------
// SIGNUP
// -------------------------------
export const Signup = tryCatch(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email format
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({
    username,
    email,
    password,
    repositories: [],
    followedUsers: [],
    starRepos: [],
  });

  await newUser.save();

  const token = createToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure:false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(201).json({
    message: "User registered successfully",
    user: newUser,
    token,
    userId: newUser._id
  });
});
 
//login
export const Login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "User not found" });

  const isValid = await user.comparePassword(password);
  if (!isValid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = createToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure:false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "Login successful",
    user,
    token,
    userId: user._id
  });
});

//get all users
export const GetAllUsers = tryCatch(async (req, res) => {
  const users = await User.find({});

  if (users.length === 0)
    return res.status(404).json({ message: "No users found" });

  return res.status(200).json({ users });
});

//get profile
export const GetUserProfile = tryCatch(async (req, res) => {

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).json({ message: "User not found" });

  return res.status(200).json({ user });
});

//update
export const UpdateUserProfile = tryCatch(async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).json({ message: "User not found" });

  if (username) user.username = username;
  if (email) user.email = email;

  await user.save();

  return res
    .status(200)
    .json({ message: "User updated successfully", user });
});

//delete
export const DeleteUserProfile = tryCatch(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).json({ message: "User not found" });

  const isValid = await user.comparePassword(password);
  if (!isValid)
    return res.status(401).json({ message: "Invalid credentials" });

  await user.remove();

  res.clearCookie("token");

  return res.status(200).json({
    message: "User deleted successfully",
  });
});
