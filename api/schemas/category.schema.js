const Joi = require('joi');

//Definición de datos
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const image = Joi.string().uri();

const getCategorySchema = Joi. object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateCategorySchema = Joi.object({
  name,
  image
});

const deleteCategorySchema = Joi.object({
  id: id.required()
});
module.exports = { getCategorySchema, createCategorySchema, updateCategorySchema, deleteCategorySchema }
