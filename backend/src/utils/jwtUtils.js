const jwt = require("jsonwebtoken");

const generateJWT = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  if (res) {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
  }
  return token;
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // invalid or expired
  }
};

module.exports = { generateJWT, verifyJWT };
