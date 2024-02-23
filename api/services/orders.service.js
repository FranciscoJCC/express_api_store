const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor(){

  }

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addProduct(data){
    const newProduct = await models.OrderProduct.create(data);

    return newProduct;
  }

  async find(){
    const orders = await models.Order.findAll();

    return orders;
  }

  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ],
    });

    return orders;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    if(!order)
      throw boom.notFound('Order not found');

    return order;
  }
}

module.exports = OrderService;
