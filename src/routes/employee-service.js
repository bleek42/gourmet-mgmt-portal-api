const logger = require('../middleware/logger');

const EmployeeService = {
  getAll(db) {
    logger.error(db);
    return db.select('*').from('employee');
  },
  getById(db, id) {
    return db.select('*').from('employee').where({ id }).first();
  },
};

module.exports = EmployeeService;
