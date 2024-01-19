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

  res.json(
    [
      {
        id: id,
        name: 'Balón',
        price: 800
      }
    ]
  );
});

module.exports = router;
