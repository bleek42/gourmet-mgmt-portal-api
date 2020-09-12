const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();

authRouter.route('/login').post(async (req, res, next) => {
  const { username, password, email } = req.body;

  const reqUser = { username, password, email };

  for (const [key, value] of Object.entries(reqUser)) {
    if (!value) {
      res.status(400).json({
        message: `${key} missing ${value} in request body!`,
      });
    }
    try {
      const db = req.app.get('db');
      const userInDb = await AuthService.getUserName(db, reqUser.username);
      if (!userInDb) {
        res.status(400).json({
          message: 'Incorrect username and/or password!',
        });
      }
      const isPassword = await AuthService.comparePassword(
        reqUser.password,
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
      if (err) {
        res.status(statusCode).json({
          error: err.message
        })
      }
      next();
    }
  }
});

module.exports = authRouter;
