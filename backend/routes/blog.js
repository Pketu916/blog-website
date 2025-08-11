const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
});

// POST a new blog
router.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

// DELETE blog by ID
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
