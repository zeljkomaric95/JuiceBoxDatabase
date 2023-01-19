const express = require('express');
const usersRouter = express.Router();

// usersRouter.use((req, res, next) => {
//   console.log("A request is being made to /users");

//   next(); // THIS IS DIFFERENT
// });

// usersRouter.get('/', (req, res) => {
//   res.send({
//     users: []
//   });
// });

// NEW
const { getAllUsers } = require('../db');

// UPDATE
usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users
  });
});

usersRouter.post('/login', async (req, res, next) => {
  console.log(req.body);
  res.end();
});

module.exports = usersRouter;