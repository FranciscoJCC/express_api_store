const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

//Router api
routerApi(app);

//Ruta del servidor
/* app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
}); */


//Levantamos el puerto
app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});


