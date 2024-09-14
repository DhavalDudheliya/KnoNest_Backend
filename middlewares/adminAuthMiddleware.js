const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// adminAuthMiddleware
const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    // check if user is admin
    if (!user || user.isAdmin !== true) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, not admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

module.exports = adminAuthMiddleware;
