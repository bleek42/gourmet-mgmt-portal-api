const express = require('express');

const employeeService = require('./employee-service');
const HttpException = require('../../utils/http-exception');

const employeeRouter = express.Router();

employeeRouter.route('/employee').get(async (req, res, next) => {
  try {
    const employees = await employeeService.getAll(req.app.get('db'));
    if (!employees) {
      throw new HttpException(404, 'Cannot find employees!');
    }
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

employeeRouter.route('/employee/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await employeeService.getById(req.app.get('db'), id);
    if (!person) {
      throw new HttpException(404, `Cannot GET Employee ID ${id}`);
    }
    res.status(200).json(person);
  } catch (err) {
    next(err);
  }
});

employeeRouter.route('/employee/new').post(async (req, res, next) => {
  console.log(req.body);
  for (const field of Object.values(req.body)) {
    console.log(field);
    if (!field) {
      res.status(400).json({
        Error: `Missing ${field} in request body!`,
      });
    }
  }
  try {
    const newEmployee = await employeeService.addNew(req.app.get('db'), req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

module.exports = employeeRouter;
