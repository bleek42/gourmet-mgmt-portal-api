const MeatService = {
  getAllMeat(db) {
    return db
      .select('*')
      .from('meat');
  },

  getById(db, id) {
    return db
      .select('*')
      .from('meat')
      .where({ id })
      .first();
  },
};

module.exports = MeatService;
