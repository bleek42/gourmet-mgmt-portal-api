const express = require('express');

const logger = require('../middleware/logger');
const EmployeeService = require('./employee-service');

const employeeRouter = express.Router();
employeeRouter.use(express.json());

employeeRouter.route('/employee').get(async (req, res, next) => {
  try {
    const employees = await EmployeeService.getAll(req.app.get('db'));
    if (!employees) {
      res.status(400).json({
        error: 'Cannot GET employees!',
      });
    }
    console.log(employees);
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

employeeRouter.get('/employee/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const person = await EmployeeService.getById(req.app.get('db'), id);
    if (!person) {
      logger.error(`cannot find an employee with id ${id}`);
      res.status(400).json({
        message: `Cannot GET Employee ID ${id}`,
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = employeeRouter;
