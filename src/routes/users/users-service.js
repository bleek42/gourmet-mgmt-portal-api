const bcrypt = require('bcrypt');
const xss = require('xss');

const UsersService = {

  checkUsers(knex, username) {
    return knex('users')
      .where({ username })
      .first()
      .then((user) => !!user);
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },

  validatePassword(password) {
    const PW_REGEX = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);
    switch (password) {
      case password.length < 8:
        console.error('password must be greater than 8 characters');
        break;
      case password.length > 20:
        console.error('password must be less than 20 characters');
        break;
      case password.startsWith(' ') || password.endsWith(' '):
        console.error('password cannot start/end with a blank space');
        break;
      case !PW_REGEX.test(password):
        console.error('password must contain an uppercase, lowercase, number, & special character');
        break;
      default:
    }
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },

  sanitizeUser(user) {
    return {
      username: xss(user.username),
      email: xss(user.email),
    };
  },
};

module.exports = UsersService;
