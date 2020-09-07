const meatService = {
  getAllMeat(db) {
    return db('meat').select('*');
  },

  getById(db, id) {
    return db('meat').select('*').where('meat.id', id);
  },
};

module.exports = meatService;
