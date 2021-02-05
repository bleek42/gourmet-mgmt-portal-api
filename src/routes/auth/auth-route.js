/* eslint-disable no-await-in-loop */
const express = require('express');

const AuthService = require('./auth-service');

const authRouter = express.Router();

authRouter.route('/login').post(async (req, res, next) => {
  const { username, password } = req.body;
  const logins = { username, password };
  console.log(req.body);
  for (const [key, value] of Object.entries(logins)) {
    if (value === null) {
      res.status(400).json({
        message: `${key} missing in request body!`,
      });
    }
    try {
      const db = req.app.get('db');
      const userInDb = await AuthService.getUserName(db, logins.username);
      if (!userInDb) {
        res.status(400).json({
          message: 'Incorrect username and/or password!',
        });
      }
      const isPassword = await AuthService.comparePassword(
        logins.password,
        userInDb.password,
      );
      if (!isPassword) {
        res.status(400).json({
          message: 'Incorrect username and/or passsword!',
        });
      }
      const subject = logins.username;
      const payload = {
        id: userInDb.id,
      };
      res.send({
        authToken: AuthService.createJwt(subject, payload),
        id: userInDb.id,
      });
    } catch (err) {
      next(err);
    }
  }
});

module.exports = authRouter;
