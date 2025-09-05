const jwt = require("jsonwebtoken");

const generateJWT = (payload, res, rememberMe) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "1d" : "1h",
  });

  if (res) {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: rememberMe ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
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
