const express = require('express');
const CustomerService = require('../services/customers.service');
//Validatos
const validatorHandler = require('../middlewares/validatorHandler');
const {createCustomerSchema, udpateCustomerSchema, getCustomerSchema, deleteCustomerSchema } = require('../schemas/customer.schema');


const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();

    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);

      res.json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(udpateCustomerSchema, 'body'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCustomer = await service.update(id, body);

      res.status(200).json(updateCustomer);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validatorHandler(deleteCustomerSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.delete(id);

      res.status(200).json(customer);
    } catch (error) {

    }
  }
)

module.exports = router;
