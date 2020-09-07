const produceService = {
  getAllProduce(db) {
    return db('produce').select('*');
  },

  getById(db, id) {
    return db('produce').select('*').where('produce.id', id);
  },
};

module.exports = produceService;
