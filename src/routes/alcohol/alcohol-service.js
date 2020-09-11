const alcoholService = {
  getAllAlcohol(db) {
    return db('alcohol').select('*');
  },

  getById(db, id) {
    return db.select('*').from('alcohol').where({ id }).first()
  },
};

module.exports = alcoholService;
