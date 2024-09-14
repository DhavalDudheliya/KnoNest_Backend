const express = require("express");
const getUser = require("../controllers/userController");
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");

const router = express.Router();

router.get("/getUser", userAuthMiddleware, getUser);

module.exports = router;
