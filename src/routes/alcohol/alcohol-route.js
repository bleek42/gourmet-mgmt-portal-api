const express = require('express');
//const xss = require('xss');
const AlcoholService = require('./alcohol-service');

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
    const alcoholService = new AlcoholService();
    const alcohol = await alcoholService.getAllAlcohol(
      req.app.get('db')
    );
    if (!alcohol) {
      res.status(400).json({
        error: 'Cannot GET alcohol!',
      });
    }
    res.status(200).json(alcohol);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
    next();
  }
});

alcoholRouter.route('/alcohol/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const alcoholService = new AlcoholService();
    const order = await alcoholService.getById(req.app.get('db'), id);
    if (!order) {
      res.status(400).json({
        message: `Cannot GET alcohol order ID ${id}`,
      });
    }
  } catch (error) {
    res.status(error.statusCode).send(error.message);
    next();
  }
});

module.exports = alcoholRouter;
