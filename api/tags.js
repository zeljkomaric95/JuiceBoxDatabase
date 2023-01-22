const express = require('express');
const tagRouter = express.Router();
const Post = require('../api/posts');

// NEW
const { getAllTags } = require('../db');

// UPDATE
tagRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  try {
    const posts = await Post.find({ tags: req.params.tag });
    res.json({ posts });
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = tagRouter;