'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    //Creamos la tabla
    await queryInterface.createTable('users',UserSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
