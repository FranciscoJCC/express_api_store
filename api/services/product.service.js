const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
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
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }

    this.products.push(newProduct);

    return newProduct;
  }

  async find() {

    const query = 'SELECT * FROM tasks';

    const [data, metadata] = await sequelize.query(query);
    //metadata tiene mas informacion sobre la consulta
    return data
  }

  async findOne(id) {

    const product = this.products.find((product => product.id === id));

    if(!product)
      throw boom.notFound('Product not found');

    if(product.isBlock)
      throw boom.conflict('Dont access this product');

    return product;
  }

  async update(id,changes) {

    const index = this.products.findIndex(item => item.id === id);

    if(index === -1)
      throw boom.notFound('Product not found');

    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...changes
    }

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);

    if(index === -1)
      throw boom.notFound('Product not found');

    this.products.splice(index, 1);

    return { id };
  }

}

module.exports = ProductsService;
