const express = require('express');

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
    res.status(200).json(employees);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
    next();
  }
});

employeeRouter.get('/employee/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;

    const person = await EmployeeService.getById(req.app.get('db'), id);
    if (!person) {
      res.status(400).json({
        message: `Cannot GET Employee ID ${id}`,
      });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
    next();
  }
});

module.exports = employeeRouter;
