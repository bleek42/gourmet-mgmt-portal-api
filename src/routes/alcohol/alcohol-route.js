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

alcoholRouter.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('id route');
    const alcohol = await alcoholService.getById(req.app.get('db'), id);
    if (!alcohol) {
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

alcoholRouter.route('/:type').get(async (req, res, next) => {
  const { type } = req.params;
  console.log('type route');
  try {
    const alcohol = await alcoholService.getByType(req.app.get('db'), type);
    if (!alcohol) {
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
