const express = require('express');
const OrderService = require('./../services/orders.service');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createOrderSchema, deleteOrderSchema, getOrderSchema, addProductSchema }  = require('./../schemas/order.schema');

const router = express.Router();

const service = new OrderService();


//List
router.get('/',
  async(req, res, next) => {
    try {
      const orders = await service.find();

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

//Create order
router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);

      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
)

//Add product to order
router.post('/new-item',
  validatorHandler(addProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const addProduct = await service.addProduct(body);

      res.status(201).json(addProduct);
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router;
