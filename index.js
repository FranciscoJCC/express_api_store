const express = require('express');
const app = express();
const port = 3000;

//Ruta del servidor
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

app.get("/new", (req, res) => {
  res.send("Hola soy una nueva ruta");
});

app.get("/api/v1/products", (req, res) => {
  res.json([
    {
      name: 'Triciclo',
      price: 3000
    },
    {
      name: 'Balón',
      price: 800
    }
  ]);
});

app.get("/api/v1/products/:id", (req, res) => {

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

app.get('/api/v1/categories/:categoryId/products/:productId', (req, res) =>{
  //Recibimos los parametros
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId
  });
})

app.get('/api/v1/user', (req, res) => {
  const { limit, offset } = req.query;

  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send('No hay parametros');
  }
})


//Levantamos el puerto
app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});


