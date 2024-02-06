const { Strategy } = require('passport-local');
const UserService = require('./../../../services/users.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserService();

const LocalStrategy = new Strategy({
  usernameField : 'email',
  passwordField : 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);

      //Si no existe el usuario
      if(!user)
        done(boom.unauthorized(), false);

      //comparamos contraseñas
      const isMatch = await bcrypt.compare(password, user.password);

      //Si las contraseñas no coinciden
      if(!isMatch){
        done(boom.unauthorized(), false);
      }

      //Eliminamos el password de la respuesta
      delete user.dataValues.password;

      done(null, user);

    } catch (error) {
      done(error, false)
    }
  }
);

module.exports = LocalStrategy;
