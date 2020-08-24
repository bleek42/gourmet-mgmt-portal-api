const express = require('express');
const path = require('path');

const UsersService = require('./users-service');

const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.route('/new').post(async (req, res, next) => {
  const { username, email, password } = req.body;

  for (const value of ['username', 'email', 'password']) {
    if (!req.body[value]) {
      res.status(400).json({
        message: `${value} is required!`,
      });
    }
  }
  try {
    const usersService = new UsersService();
    const passwordError = usersService.validatePassword(password);
    if (passwordError) {
      res.status(400).json({
        message: passwordError,
      });
    }
    const db = req.app.get('db');
    const usernameTaken = await usersService.scanUsers(db, username);
    if (usernameTaken) {
      res.status(400).json({
        message: 'username is taken! please try a different one...',
      });
    }
    const hashedPassword = await usersService.hashPassword(password);
    const newUser = {
      username,
      password: hashedPassword,
      email,
    };
    const user = await usersService.insertUser(db, newUser);
    res
      .status(201)
      .location(path.posix.join('/login'))
      .json(usersService.sanitizeInput(user));
  } catch (error) {
    res.status(error.statusCode).send(error.message);
    next();
  }
});

module.exports = usersRouter;
