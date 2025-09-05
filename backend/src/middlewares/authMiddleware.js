const httpStatusText = require("../utils/httpsStatusText.js");
const { verifyJWT } = require("../utils/jwtUtils.js");

const authMiddleware = (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: httpStatusText.FAILED,
      data: { message: "No token provided" },
    });
  }

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
