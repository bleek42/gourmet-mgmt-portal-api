const express = require('express');
//const xss = require('xss');
const produceService = require('./produce-service');

const produceRouter = express.Router();

/*
const serializeProduce = (produce) => ({
  id: produce.id,
  price: produce.price,
  name: xss(produce.name),
  quantity: produce.quantity,
  date_ordered: produce.date_ordered,
});
*/

produceRouter.route('/').get(async (req, res, next) => {
  try {
    const produce = await produceService.getAllProduce(req.app.get('db'));
    if (!produce) {
      res.status(400).json({
        error: 'Cannot GET produce!',
      });
    }
    res.status(200).json(produce);
  } catch (err) {
    next(err);
  }
});

produceRouter.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const item = await produceService.getById(req.app.get('db'), id);
    if (!item) {
      res.status(400).json({
        message: `Cannot GET produce item ${id}`,
      });
    }
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = produceRouter;
