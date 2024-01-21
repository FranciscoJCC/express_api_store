const express = require('express');
const ProductsService = require("../services/product.service");
const validatorHandler = require("../middlewares/validatorHandler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema");

const router = express.Router();

const service = new ProductsService();

router.get("/", async (req, res) => {
  const products = await service.find();

  res.json(products);
});

//Primero metodos estaticos, luego dinamicos
router.get('/filter', (req, res) => {
  res.send("Soy estatico");
})

router.get("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Crear un producto
router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req, res, next) => {
    const body = req.body;
    const newProduct = await service.create(body);

    try {
      res.status(201).json({
        message: 'created',
        data: newProduct
      });
    } catch (error) {
      next(error);
    }

  }
);

//Actualizar un producto
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Eliminar un producto
router.delete('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const product = await service.delete(id);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
