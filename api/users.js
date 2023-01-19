const express = require('express');
const usersRouter = express.Router();

// NEW
const { getAllUsers, getUserByUsername } = require('../db');

// UPDATE
usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users
  });
});

// usersRouter.post('/login', async (req, res, next) => {
//   console.log(req.body);
//   res.end();
// });
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      // create token & return to user
      res.send({ message: "you're logged in!" });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
    
  } catch(error) {
    console.log(error);
    next(error);
  }
});

const jwt = require('jsonwebtoken');

const user = { id: 3, username: 'albert' };
// encode/encrypt the user
const token = jwt.sign(user, 'server secret');

// decode/decrypt the user
const recoveredData = jwt.verify(token, 'server secret');
console.log(recoveredData);



module.exports = usersRouter;