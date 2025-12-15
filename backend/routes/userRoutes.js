const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  deleteUser,
  getAllUsers,
  resetPassword,
  forgotPassword,
  logout,
} = require("../controllers/userControllers");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const { validateSignup, validateLogin } = require("../middleware/validate");

const router = express.Router();

router.post("/register", validateSignup, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", authMiddleware, logout);

router.get("/profile", authMiddleware, getUserProfile);
router.put("/update", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);

router.get("/all", authMiddleware, adminMiddleware, getAllUsers);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
