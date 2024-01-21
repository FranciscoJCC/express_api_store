const boom = require('@hapi/boom');

function validatorHandler(schema, property){
  return (req, res, next) => {
    //Datos del request
    const data = req[property];
    //Validamos la data
    const {error} = schema.validate(data, { abortEarly: false });

    if(error)
      next(boom.badRequest(error));

    next();
  }
}

module.exports = validatorHandler;
