const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chatRoutes.js");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const { initSocket } = require("./utils/socket.js");
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

connectDB();
initSocket(server);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);

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
server.listen(PORT, () => {
    console.log(`Express + Socket.IO server running at http://localhost:${PORT}/`);
});