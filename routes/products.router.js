const express = require('express');
const ProductsService = require("../services/product.service");

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

router.get("/:id", async (req, res) => {

  const { id } = req.params;
  const product = await service.findOne(id);

  if(product)
    res.status(200).json(product);
  else
    res.status(404).json({ message : "product not found"})
});

//Crear un producto
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  res.status(201).json({
    message: 'created',
    data: newProduct
  });
});

//Actualizar un producto
router.patch('/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const body = req.body;

    const product = await service.update(id, body);

    res.json(product);

  } catch (error) {
    res.status(404).json({ message: error.message})
  }

});

//Eliminar un producto
router.delete('/:id', async (req, res) => {

  const { id } = req.params;

  const product = await service.delete(id);

  res.json(product);

});

module.exports = router;
