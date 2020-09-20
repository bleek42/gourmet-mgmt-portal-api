const express = require('express');
const path = require('path');

const UsersService = require('./users-service');
const HttpException = require('../../utils/http-exception');

const usersRouter = express.Router();

usersRouter.route('/users/:id').get(async (req, res, next) => {
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

usersRouter.route('/users/new').post(async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(username, email, password);
  for (const values of ['username', 'email', 'password']) {
    if (!req.body[values]) {
      res.status(400).json({
        Error: `Missing ${values} in request body!`,
      });
    }
  }
  try {
    const passWordErr = await UsersService.validatePassword(password);
    console.log(passWordErr);
    if (passWordErr) {
      res.status(400).json({ Error: `${password} does not meet requirements` });
    }

    const isExistingUser = await UsersService.checkUsers(req.app.get('db', username));
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

    const userToAdd = await UsersService.insertUser(req.app.get('db'), newUser);

    res.status(201)
      .location(path.posix.join(req.originalUrl, `/${userToAdd.id}`))
      .json(UsersService.sanitizeUser(userToAdd));
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
