class AlcoholService {
  getAllAlcohol(db) {
    return db('alcohol').select('*');
  }

  getById(db, id) {
    return db('alcohol').select('*').where('alcohol.id', id);
  }
}

module.exports = AlcoholService;
