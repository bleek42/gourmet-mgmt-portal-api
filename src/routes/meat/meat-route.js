const express = require('express');
//const xss = require('xss');
const meatService = require('./meat-service');

const meatRouter = express.Router();

/*
const serializeMeat = (meat) => ({
  id: meat.id,
  price: meat.price,
  name: xss(meat.name),
  quantity: meat.quantity,
  date_ordered: meat.date_ordered,
});
*/

meatRouter.route('/').get(async (req, res, next) => {
  try {
    const meat = await meatService.getAllMeat(req.app.get('db'));
    if (!meat) {
      res.status(400).json({
        error: 'Cannot GET meat!',
      });
    }
    res.status(200).json(meat);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
    next();
  }
});

meatRouter.route('/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const order = await meatService.getById(req.app.get('db'), id);
    if (!order) {
      res.status(400).json({
        message: `Cannot GET meat order ID ${id}`,
      });
    }
  } catch (err) {
    res.status(err.statusCode).send(err.message);
    next();
  }
});

module.exports = meatRouter;
