const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("no token");
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: decoded.id });

    next();
  } catch (error) {
    console.log("token verification failed");
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

module.exports = userAuthMiddleware;
