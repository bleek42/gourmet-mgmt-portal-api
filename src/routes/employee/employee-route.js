const express = require('express');

const employeeService = require('./employee-service');
const { HttpException } = require('../../middleware/error-handler');

const employeeRouter = express.Router();

employeeRouter.route('/employee').get(async (req, res, next) => {
  try {
    const employees = await employeeService.getAll(req.app.get('db'));
    if (!employees) {
      throw new HttpException(404, 'Cannot find employees!');
    }
    res.status(200).json(employees);
    next();
  } catch (err) {
    throw new HttpException(500, 'Internal server error!');
  }
});

employeeRouter.get('/employee/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const person = await employeeService.getById(req.app.get('db'), id);
    if (!person) {
      throw new HttpException(404, `Cannot GET Employee ID ${id}`);
    }
    res.status(200).json(person);
    next();
  } catch (err) {
    throw new HttpException(500, 'Internal server error!');
  }
});

module.exports = employeeRouter;
