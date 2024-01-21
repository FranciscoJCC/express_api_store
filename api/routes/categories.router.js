const express = require('express');

const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res) =>{
  //Recibimos los parametros
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId
  });
})

module.exports = router;
