const Joi = require('joi');

const { createUserSchema, updateUserSchema } = require('./user.schema');

//Definición de datos para validaciones
const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const lastName = Joi.string();
const phone = Joi.string();
//const userId = Joi.number().integer();


const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  //userId: userId.required(),
  user: createUserSchema,
});

const udpateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  user: updateUserSchema
});

module.exports = { getCustomerSchema, createCustomerSchema, udpateCustomerSchema }
