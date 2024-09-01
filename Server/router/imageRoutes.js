const express = require('express');
const multer = require('multer');
const Post = require('../models/imageModel'); 

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { path, filename } = req.file;
    const { title, description } = req.body; 

    const image = new Post({ path, filename, title, description });
    await image.save();

    res.json({ message: 'Image and data uploaded successfully', image });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});

router.get('/getPost', async (req, res) => {
    try {
      const post = await Post.find();
      res.json({ post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Failed to fetch post', error });
    }
  });

// Route to get a single post by ID
router.get('/getPost/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// Example delete route in your backend
router.delete('/deletePost/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Example update route for editing a post
router.put('/editPost/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

module.exports = router;
