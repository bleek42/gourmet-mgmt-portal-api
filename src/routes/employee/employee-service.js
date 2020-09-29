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
  addNew(db, newEmployee) {
    return db
      .insert(newEmployee)
      .into('employee')
      .returning('*')
      .then(([employee]) => employee);
  },
};

module.exports = employeeService;
