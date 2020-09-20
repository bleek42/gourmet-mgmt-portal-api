const employeeService = {
  getAll(db) {
    return db.select('*')
      .from('employee');
  },
  getById(db, id) {
    return db.select('*')
      .from('employee')
      .where({ id })
      .first();
  },
};

module.exports = employeeService;
