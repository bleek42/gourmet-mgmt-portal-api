const xss = require('xss');
const bcrypt = require('bcrypt');

class UsersService {
  scanUsers(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then((user) => !!user);
  }
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  }
  validatePassword(password) {
    const pwRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    // eslint-disable-next-line no-empty
    switch (password) {
      case password.length < 8:
        console.error('password too short');
        break;
      case password.length > 28:
        console.error('password too long');
        break;
      case password.startsWith(' ') || password.endsWith(' '):
        console.error('password cannot start/end with blank space!');
        break;
      case !pwRegex.test(password):
        console.error('needs uppercase, lowercase, number & special char!');
        break;
      default:
        return;
    }
  }
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  }
  sanitizeInput(user) {
    return {
      username: xss(user.username),
      email: xss(user.email),
    };
  }
}

module.exports = UsersService;
