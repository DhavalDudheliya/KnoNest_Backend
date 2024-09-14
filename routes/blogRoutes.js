const express = require("express");
const {
  creatBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  addCommentOnBlog,
  blogs,
} = require("../controllers/blogController");
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");

const router = express.Router();

// Admin routes
router.post("/createBlog", creatBlog);
router.put("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);

// Public routes
router.get("/getBlogs", getBlogs);
router.get("/getBlogById/:id", getBlogById);

// Authenticated User routes
router.post("/likeBlog/:id", userAuthMiddleware, likeBlog);
router.post("/addCommentOnBlog/:id", userAuthMiddleware, addCommentOnBlog);

module.exports = router;
