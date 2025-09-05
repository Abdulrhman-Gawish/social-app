// routes/auth.routes.js
const express = require("express");
const { signup, login } = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

// POST /api/v1/auth/signup
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
