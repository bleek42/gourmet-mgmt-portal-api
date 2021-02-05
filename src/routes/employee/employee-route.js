const express = require('express');

const employeeService = require('./employee-service');

const employeeRouter = express.Router();

employeeRouter.route('/').get(async (req, res, next) => {
  try {
    const employees = await employeeService.getAll(req.app.get('db'));
    if (!employees) {
      res.status(400).json({ message: 'Cannot GET Employees' });
    }
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

employeeRouter.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getById(req.app.get('db'), id);
    if (!employee) {
      res.status(400).json({ message: `Cannot GET Employee ID ${id}` });
    }
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
});

employeeRouter.route('/new').post(async (req, res, next) => {
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
