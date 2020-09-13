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

usersRouter.route('users').post(async (req, res, next) => {

  const { username, password, email } = req.body;

  for (const values of ['username', 'password', 'email']) {
    if (!req.body[values]) {
      throw new HttpException(400, `Missing ${values} in request body!`);
    }

    try {
      const passWordErr = await UsersService.validatePassword(password);

      if (passWordErr) {
        throw new HttpException(400, `${password} does not meet requirements`);
      }
      res.status(200).send('it works!')
    } catch (err) {
      next(err);
    }
  })