const express = require('express');
// const xss = require('xss');
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

alcoholRouter.route('/').get(async (req, res, next) => {
  try {
    const alcohol = await alcoholService.getAllAlcohol(req.app.get('db'));
    if (!alcohol) {
      res.status(400).json({
        error: 'Cannot GET alcohol!',
      });
    }
    res.status(200).json(alcohol);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
    next();
  }
});

alcoholRouter.route('/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const order = await alcoholService.getById(req.app.get('db'), id);
    if (!order) {
      res.status(400).json({
        message: `Cannot GET alcohol ID ${id}`,
      });
    }
    res.status(200).json(id);
  }
  catch (err) {
    next(err);
  }
});

alcoholRouter.route('/type', async (req, res, next) => {
  try {
    console.log(req.query);
    const { type } = req.query;
    const query = await alcoholService.getByType(req.app.get('db'), type);
    if (!query) {
      res.status(400).json({
        message: `Cannot GET alcohol type ${type}`,
      });
    }
    res.status(200).json(type);
  }
  catch (err) {
    next(err);
  }
});

module.exports = alcoholRouter;
