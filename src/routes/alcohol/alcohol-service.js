const alcoholService = {
  getAllAlcohol(db) {
    return db('alcohol').select('*');
  },

  getById(db, id) {
    return db('alcohol').select('*').where('alcohol.id', id);
  },

  getByType(db, type) {
    return db('alcohol').select('type').where('type', type);
  },
};

module.exports = alcoholService;
