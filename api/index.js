const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;


//middleware para recibir datos
app.use(express.json());

//Uso de cors, cualquier origen
//app.use(cors());

//permitir el cors a dominios especificos
const whiteList = ['http://localhost:80', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('Permission Denied'));
    }
  }
}
app.use(cors(options))

//Router api
routerApi(app);

//Los midddleware se declaran desdpues del routerApi
//El orden es secuencial
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//Ruta del servidor
app.get("/api", (req, res) => {
  res.send("Hola mi server en Express");
});


//Levantamos el puerto
app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});


