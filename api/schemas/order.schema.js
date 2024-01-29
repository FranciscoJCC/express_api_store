const Joi = require('joi');

//Def
const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId: customerId
});

const getOrderSchema = Joi.object({
  id: id.required()
});

const deleteOrderSchema = Joi.object({
  id: id.required()
});

const addProductSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

module.exports = { createOrderSchema, getOrderSchema, deleteOrderSchema, addProductSchema }
