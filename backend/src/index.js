const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth.routes");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({
    status: "ERROR",
    data: null,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
