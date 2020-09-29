const produceService = {
  getAllProduce(db) {
    return db('produce')
      .select('*');
  },

  getById(db, id) {
    return db('produce')
      .select('*')
      .where({ id })
      .first();
  },
};

module.exports = produceService;
