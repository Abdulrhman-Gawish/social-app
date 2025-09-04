// middlewares/authMiddleware.js
const httpStatusText = require("../utils/httpsStatusText.js");
const { verifyJWT } = require("../utils/jwtUtils.js");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: httpStatusText.FAILED,
      data: { message: "No token provided" },
    });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyJWT(token);

  if (!decoded) {
    return res.status(401).json({
      status: httpStatusText.FAILED,
      data: { message: "Invalid or expired token" },
    });
  }

  req.user = decoded; // attach user info (id, email) to request
  next();
};

module.exports = authMiddleware;
