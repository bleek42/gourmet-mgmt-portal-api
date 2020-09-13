const express = require('express');
const path = require('path');

const UsersService = require('./users-service');
const HttpException = require('../../utils/http-exception');

const usersRouter = express.Router();

usersRouter.route('/users/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UsersService.getUser(id);
    if (!user) {
      throw new HttpException(404, `Cannot GET employee ${id}`);
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/users/new').post(async (req, res, next) => {
  const { username, password, email } = req.body;

  for (const values of ['username', 'password', 'email']) {
    if (!req.body[values]) {
      throw new HttpException(400, `Missing ${values} in request body!`);
    }
  }
  try {
    const passWordErr = await UsersService.validatePassword(password);

    if (passWordErr) {
      throw new HttpException(400, `${password} does not meet requirements`);
    }

    const isExistingUser = await UsersService.checkUsers(req.app.get('db', username));
    if (isExistingUser) {
      throw new HttpException(400, `${username} is already taken!`);
    }

    const hashedPassword = await UsersService.hashPassword(password);

    const newUser = {
      username,
      password: hashedPassword,
      email,
    };

    const userToAdd = await UsersService.insertUser(req.app.get('db'), newUser);

    res.status(201)
      .location(path.posix.join('/login'))
      .json(UsersService.sanitizeUser(userToAdd));
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
