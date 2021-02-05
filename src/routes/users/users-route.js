const express = require('express');
const path = require('path');

const UsersService = require('./users-service');

const usersRouter = express.Router();

usersRouter.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await UsersService.getUser(id);
    if (!user) {
      res.status(404).json({
        Error: `Cannot find user number ${id}`,
      });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/new').post(async (req, res, next) => {
  const { username, password, email } = req.body;
  const db = req.app.get('db');
  // console.log(username, email, password);
  for (const value of ['username', 'email', 'password']) {
    if (!req.body[value]) {
      res.status(400).json({
        Error: `Missing ${value} in request body!`,
      });
    }
  }
  try {
    const passWordErr = UsersService.validatePassword(password);
    if (passWordErr) {
      res.status(400).json({ Error: passWordErr });
    }

    const isExistingUser = await UsersService.checkUsers(db, username);
    if (isExistingUser) {
      res.status(400).json({
        Error: `${username} is taken by an existing user!`,
      });
    }

    const hashedPassword = await UsersService.hashPassword(password);

    const newUser = {
      username,
      password: hashedPassword,
      email,
    };

    const userToAdd = await UsersService.insertUser(db, newUser);
    res.status(201)
      .location(path.posix.join('/login'))
      .json(UsersService.sanitizeUser(userToAdd));
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
