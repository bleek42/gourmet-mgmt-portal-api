const alcoholService = {
  getAllAlcohol(db) {
    return db('alcohol').select('*');
  },

  getById(db, id) {
    console.log(id);
    return db.from('alcohol').select('*').where('id', id).first();
  },

  getByType(db, type) {
    console.log(type);
    return db('alcohol').select('*').where('type', type);
  },
};

module.exports = alcoholService;
