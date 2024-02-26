const Joi = require('joi');

//Definimos los datos
const email = Joi.string().email();
const token = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/);
const password = Joi.string().min(8);

const recoverySchema = Joi.object({
  email: email.required()
});

const changePasswordSchema = Joi.object({
  token: token.required(),
  password: password.required(),
})

module.exports = { recoverySchema, changePasswordSchema }
