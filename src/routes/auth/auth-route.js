/* eslint-disable no-await-in-loop */
const express = require('express');

const AuthService = require('./auth-service');
const { requireAuth } = require('../../middleware/jwt-auth');

const authRouter = express.Router();

authRouter.route('/login').post(async (req, res, next) => {
  const { username, password } = req.body;
  const logins = { username, password };
  for (const [key, value] of Object.entries(logins)) {
    if (!value) {
      res.status(400).json({
        message: `${key} missing in request body!`,
      });
    }
    try {
      const db = req.app.get('db');
      const userInDb = await AuthService.getUserName(db, username);
      if (!userInDb) {
        res.status(400).json({
          message: 'Incorrect username and/or password!',
        });
      }
      const isPassword = await AuthService.comparePassword(
        password,
        userInDb.password,
      );
      if (!isPassword) {
        res.status(400).json({
          message: 'Incorrect username and/or passsword!',
        });
      }
      const subject = userInDb.id;
      const payload = {
        id: userInDb.id,
      };
      res.status(200).json({
        authToken: AuthService.createJwt(subject, payload),
        id: userInDb.id,
      });
    } catch (err) {
      next(err);
    }
  }
});

module.exports = authRouter;
