const User = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "Users fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getUser;
