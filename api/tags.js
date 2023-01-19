const express = require('express');
const tagRouter = express.Router();

// NEW
const { getAllTags } = require('../db');

// UPDATE
tagRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

module.exports = tagRouter;