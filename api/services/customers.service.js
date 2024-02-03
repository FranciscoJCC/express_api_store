const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class CustomerService {
  constructor(){

  }

  async create(data){

    /*
      Encriptamos el password, tambien se puede hacer en el modelo con los hooks
    */
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };

    //Creamos el registro
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });

    //Borramos el password
    //delete newCustomer.dataValues.user.dataValues.password;

    return newCustomer;
  }

  async find(){

    const customers = await models.Customer.findAll({
      include: ['user']
    });

    return customers;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id, {
      include: ['user']
    });

    if(!customer)
      throw boom.notFound('customer not found');

    return customer;
  }

  async update(id, changes){
    const customer = await this.findOne(id);

    const response = await customer.update(changes);

    return response;
  }

  async delete(id){
    const customer = await this.findOne(id);

    await customer.destroy();

    return { id };
  }

}

module.exports = CustomerService;
