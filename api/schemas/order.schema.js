const Joi = require('joi');

//Def
const id = Joi.number().integer();
const customerId = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId: customerId
});

const getOrderSchema = Joi.object({
  id: id.required()
});

const deleteOrderSchema = Joi.object({
  id: id.required()
});

module.exports = { createOrderSchema, getOrderSchema, deleteOrderSchema }
