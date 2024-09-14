const Blog = require("../models/blogModel");

// Create blog
const creatBlog = async (req, res) => {
  const { title, subtitle, content, imageUrl, author } = req.body;

  try {
    const blog = new Blog({ title, subtitle, content, imageUrl, author });
    const savedBlog = await blog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: savedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate({ path: "comments.user" });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update blog by ID
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl, author } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    title && (blog.title = title);
    content && (blog.content = content);
    imageUrl && (blog.imageUrl = imageUrl);
    author && (blog.author = author);
    const updatedBlog = await blog.save();
    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete blog by ID
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Like blog
const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("comments.user");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user has already liked the blog
    if (blog.likes.includes(req.user._id)) {
      blog.likes = blog.likes.filter((like) => like.toString() != req.user._id);
      const updatedBlog = await blog.save();
      return res
        .status(200)
        .json({ message: "Blog unliked successfully", blog: updatedBlog });
    }
    blog.likes.push(req.user._id);
    const updatedBlog = await blog.save();
    res
      .status(200)
      .json({ message: "Blog liked successfully", blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a comment to blog
const addCommentOnBlog = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  console.log(comment);
  console.log(id);

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.comments.push({ user: req.user._id, comment });
    await blog.save();
    const updatedBlog = await Blog.findById(id).populate("comments.user");
    res
      .status(200)
      .json({ message: "Comment added successfully", blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  creatBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  addCommentOnBlog,
};
