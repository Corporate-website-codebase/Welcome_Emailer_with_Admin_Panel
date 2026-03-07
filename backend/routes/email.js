const express = require("express");
const authMiddleware = require("../middleware/auth");
const { previewEmail, sendEmail } = require("../controllers/emailController");

const router = express.Router();

// Preview endpoint
router.post("/preview", authMiddleware, previewEmail);

// Send email endpoint
router.post("/send", authMiddleware, sendEmail);

module.exports = router;
