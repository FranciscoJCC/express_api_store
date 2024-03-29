const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('./../libs/sequelize');

class ProductsService {

  constructor(){
    //this.products = [];
    //this.generate();
  }

  //Genera productos aleatorios
  /* generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push(
        {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price()),
          image: faker.image.url(),
          isBlock: faker.datatype.boolean()
        }
      )
    }
  } */

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(queryOptions) {

    const options = {
      include: ['category'],
      where: {}
    }

    const { limit, offset, price, minPrice, maxPrice } = queryOptions;

    //Filtros de paginacion
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    //Filtro de precio especifico
    if(price){
      options.where.price = price;
    }

    if(minPrice && maxPrice){
      options.where.price = {
        [Op.gte]: minPrice,
        [Op.lte]: maxPrice
      }
    }

    const products = await models.Product.findAll(options);

    //metadata tiene mas informacion sobre la consulta
    return products
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id,{
      include: ['category']
    });

    if(!product)
      throw boom.notFound('Product not found');

    return product;
  }

  async update(id,changes) {

    const product = await this.findOne(id);

    const response = await product.update(changes);

    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);

    await product.destroy();

    return { id };
  }

}

module.exports = ProductsService;
