const express = require('express');
// const xss = require('xss');
const MeatService = require('./meat-service');

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

meatRouter.route('/meat').get(async (req, res, next) => {
  try {
    const meats = await MeatService.getAllMeat(req.app.get('db'));
    if (!meats) {
      res.status(400).json({
        error: 'Cannot GET meat!',
      });
    }
    res.status(200).json(meats);
  } catch (err) {
    next(err);
  }
});

meatRouter.route('/meat/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const item = await MeatService.getById(req.app.get('db'), id);
    if (!item) {
      res.status(400).json({
        message: `Cannot GET meat order ID ${id}`,
      });
    }
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = meatRouter;
