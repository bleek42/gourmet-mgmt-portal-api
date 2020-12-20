const alcoholService = {
  getAllAlcohol(db) {
    return db('alcohol').select('*');
  },

  getById(db, id) {
    return db('alcohol').select('*').where(id).first();
  },

  getByType(db, query) {
    console.log(query.type);
    return db('alcohol').select('type').where('type', query.type);
  },
};

module.exports = alcoholService;
