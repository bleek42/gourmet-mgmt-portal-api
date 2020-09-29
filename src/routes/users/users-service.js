const bcrypt = require('bcrypt');
const xss = require('xss');

const UsersService = {
  getUser(db, id) {
    console.log(db, id, 'getUser');
    return db
      .from('users')
      .select('*')
      .where({ id })
      .first();
  },

  checkUsers(db, username) {
    return db
      .select('users')
      .where({ username })
      .first()
      .then((user) => !!user);
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },

  validatePassword(password) {
    // eslint-disable-next-line no-useless-escape
    console.log(password);
    const PW_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!PW_REGEX.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character'
    }
    return null;
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
