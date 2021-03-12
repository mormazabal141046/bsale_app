const express = require("express");
const app = express();
const path = require('path');
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require(__dirname +"/api-docs/api.json")
const router = require(path.join(__dirname+'/routes/index'));

// Configuraciones
app.set('port', process.env.PORT || 3005);
app.set('json spaces',2)
app.use(express.json());
app.use(express.urlencoded({extended: false}))


// Se establece una ruta estatica para renderizar pagina de inicio 
app.use(express.static(process.cwd()));

// Routes API
app.use('/api', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

// Middleware
app.use((req, res, next) => {
  res.status(404).send("404 No Encontrado");
  });

//   Servidor Iniciado
app.listen(app.get('port'), () => {
    console.log(`Servidor BSALE http://localhost:${app.get('port')}`);
});