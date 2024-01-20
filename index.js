const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3000;


//middleware para recibir datos
app.use(express.json());

//Router api
routerApi(app);

//Los midddleware se declaran desdpues del routerApi
//El orden es secuencial
app.use(logErrors);
app.use(errorHandler);

//Ruta del servidor
/* app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
}); */


//Levantamos el puerto
app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});


