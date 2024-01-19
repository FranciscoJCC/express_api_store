const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get("/", (req, res) => {

  const { size }  = req.query;
  const limit = size || 5;
  const products = [];

  for (let index = 0; index < limit; index++) {
    products.push(
      {
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
      }
    )
  }

  res.json(products);
});

//Primero metodos estaticos, luego dinamicos
router.get('/filter', (req, res) => {
  res.send("Soy estatico");
})

router.get("/:id", (req, res) => {

  const { id } = req.params;

  if(id === '999'){
    res.status(404).json(
      [
        {
          message: 'not found',
        }
      ]
    );
  }else{
    res.status(200).json(
      [
        {
          id: id,
          name: 'Balón',
          price: 800
        }
      ]
    );
  }


});

//Crear un producto
router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'created',
    data: body
  });
});

//Actualizar un producto
router.patch('/:id', (req, res) => {

  const { id } = req.params;
  const body = req.body;


  res.json({
    message: 'update',
    data: body,
    id
  });
});

//Eliminar un producto
router.delete('/:id', (req, res) => {

  const { id } = req.params;

  res.json({
    message: 'delete',
    id
  });
});

module.exports = router;
