const Joi = require('joi');

//Definimos los datos
const email = Joi.string().email();

const recoverySchema = Joi.object({
  email: email.required()
});

module.exports = { recoverySchema }
