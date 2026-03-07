const express = require("express");
const authMiddleware = require("../middleware/auth");
const { login, logout, getMe } = require("../controllers/authController");

const router = express.Router();

// Login endpoint
router.post("/login", login);

// Logout endpoint
router.post("/logout", logout);

// Get current user endpoint
router.get("/me", authMiddleware, getMe);

module.exports = router;
