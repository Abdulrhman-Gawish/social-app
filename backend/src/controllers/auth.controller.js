// controllers/auth.controller.js
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const { generateJWT } = require("../utils/jwtUtils.js");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const httpStatusText = require("../utils/httpsStatusText.js");
const LoginAttempt = require("../models/LoginAttempt.js");

const { hashPassword, verifyPassword } = require("../utils/passwordUtils.js");

const signup = asyncWrapper(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log("req.body:", req.body);

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: httpStatusText.FAILED,
      data: { message: "Passwords do not match" },
    });
  }

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).json({
      status: httpStatusText.FAILED,
      data: { message: "User already exists" },
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = await generateJWT(
    {
      id: newUser._id,
      email: newUser.email,
    },
    res
  );

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        postsCount: newUser.postsCount,
        followersCount: newUser.followersCount,
        followingCount: newUser.followingCount,
      },
      token,
    },
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password, rememberMe } = req.body;
  console.log("RememberMe:", req.body.rememberMe);
  if (!email || !password) {
    return res.status(400).json({
      status: httpStatusText.FAILED,
      data: { message: "Email and password are required" },
    });
  }

  const user = await User.findOne({ email });
  let success = false;

  if (user) {
    const isMatch = await verifyPassword(password, user.password);
    success = isMatch;
  }

  // log attempt (success or failure)
  await LoginAttempt.create({
    email,
    success,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  if (!user || !success) {
    return res.status(401).json({
      status: httpStatusText.FAILED,
      data: { message: "Invalid credentials" },
    });
  }

  /*const accessToken = await generateJWT(
    { id: user._id, email: user.email },
  
  );
  const refreshToken = await generateJWT(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH_EXPIRES
  );*/

  const token = await generateJWT(
    { id: user._id, email: user.email },
    res,
    rememberMe
  );

  console.log(
    `[LOGIN] user ${user.email} logged in at ${new Date().toISOString()}`
  );

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
});

const logout = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    status: "SUCCESS",
    data: { message: "Logged out successfully" },
  });
};

module.exports = { signup, login, logout };
