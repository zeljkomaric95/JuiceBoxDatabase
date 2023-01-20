const express = require('express');
const postsRouter = express.Router();
const { requireUser } = require('./utils');

// postsRouter.post('/', requireUser, async (req, res, next) => {
//   res.send({ message: 'under construction' });
// });

postsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.authorId = req.user.id;
    postData.title = title;
    postData.content = content;
    const post = await createPost;

    // this will create the post and the tags for us
    res.send({ post });
    next();
  } catch ({ name, message }) {
    next({ name, message });
  }
});


// NEW
const { getAllPosts, createPost } = require('../db');

// UPDATE
postsRouter.get('/', async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts
  });
});

module.exports = postsRouter;