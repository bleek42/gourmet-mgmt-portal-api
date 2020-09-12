const express = require('express');
//const xss = require('xss');
const alcoholService = require('./alcohol-service');

const alcoholRouter = express.Router();

/*
const serializeAlcohol = (alcohol) => ({
  id: alcohol.id,
  type: alcohol.alcohol_type,
  price: alcohol.price,
  name: xss(alcohol.name),
  quantity: alcohol.quantity,
  date_ordered: alcohol.date_ordered,
});
*/

alcoholRouter.route('/alcohol').get(async (req, res, next) => {
  try {
    const alcohol = await alcoholService.getAllAlcohol(req.app.get('db'));
    if (!alcohol) {
      res.status(400).json({
        error: 'Cannot GET alcohol!',
      });
    }
    res.status(200).json(alcohol);
  } catch (err) {
    if (err) {
      res.status(err.statusCode).json({ error: err.message })
    }
    next();
  }
});

alcoholRouter.route('/alcohol/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await alcoholService.getById(req.app.get('db'), id);
    if (!item) {
      res.status(400).json({
        message: `Cannot GET alcohol order ID ${id}`,
      });
    }
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = alcoholRouter;
