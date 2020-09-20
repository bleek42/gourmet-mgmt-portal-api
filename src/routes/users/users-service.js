const bcrypt = require('bcrypt');
const xss = require('xss');

const UsersService = {
  getUser(db, id) {
    console.log(db, id, 'getUser');
    return db
      .select('*')
      .from('users')
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
    const PW_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    return PW_REGEX.test(password) ? console.info(`${password} passes!`) : console.error(`${password} fails!`);
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
