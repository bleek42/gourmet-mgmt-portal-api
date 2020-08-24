const express = require('express');
const AuthService = require('./auth-router');

const authRouter = express.Router();
// const authService = new AuthService();
authRouter.use(express.json());

authRouter.route('/login').post(async (req, res, next) => {
  const { id, username, password, email } = req.body;

  const reqUser = { id, username, password, email };

  for (const [key, value] of Object.entries(reqUser)) {
    if (!value) {
      res.status(400).json({
        message: `${key} missing ${value} in request body!`,
      });
    }
    try {
      const db = req.app.get('db');
      const authService = new AuthService();
      const userInDb = await authService.getUserName(db, reqUser.username);
      if (!userInDb) {
        res.status(400).json({
          message: 'Incorrect username and/or password!',
        });
      }
      const isPassword = await authService.comparePassword(
        reqUser.password,
        userInDb.password
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
        authToken: authService.createJwt(subject, payload),
        id: userInDb.id,
      });
    } catch (error) {
      res.status(error.statusCode).send(error.message);
      next();
    }
  }
});

module.exports = authRouter;
