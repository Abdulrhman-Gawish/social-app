const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// Routes
app.use("/api/v1/auth", authRoutes);

//Handle unmatched routes -default route-
app.use((req, res) => {
  res.status(404).json({
    status: "ERROR",
    data: null,
    message: "Route not found",
  });
});

//global error handler 
app.use((err, req, res, next) => {
  console.error("Global handler:", err.message);
  res.status(err.status).json({ error: err.message });
});

module.exports = app;
