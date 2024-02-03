const boom = require('@hapi/boom');

//const pool = require('../libs/postgres.pool');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {
    //this.pool = pool;
    //this.pool.on('error',(err) => console.log(err));
  }

  //Create user
  async create(data){

    const newUser = await models.User.create(data);

    delete newUser.dataValues.password;

    return newUser;
  }

  //List users
  async find(){

    const response = await models.User.findAll({include:['customer']});

    //const response = await pool.query(query);
    /* console.log('response');*/
    /* console.log(response.rows); */
    return response;
  }

  async findOne(id){

    const user = await models.User.findByPk(id);

    if(!user)
      throw boom.notFound('user not found');

    return user;
  }

  async update(id, changes){

    const user = await this.findOne(id);

    const respose = await user.update(changes);

    return respose;
  }

  async delete(id){

    const user = await this.findOne(id);

    await user.destroy();

    return { id };
  }

}

module.exports = UserService;
