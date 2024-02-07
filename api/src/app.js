const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const routes = require('./routes/index.js');

require('./db.js');

const server = express(); // inicializo mi servidor

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));// ESTA CONFIGURACION PERMITE TRADUCIR UN JSON A UN OBJ DE JAVASCRIPT. ESTO ES PARA HACER POST POR BODY. CREAR DOGS POR BODY.
server.use(cookieParser());
server.use(morgan('dev')); // EL METODO USE ES DE EXPRESS Y SIRVE PARA INDICARLE A MI APLICACION QUE OCUPE EL MIDDLEWARE MORGAR Y SE EJECUTE SOLO EN EL AMBITO DE DESARROLLO(DEV). MORGAN MUESTRA EN CONSOLA LAS PETICIONES.
server.use((req, res, next) => {// ESTA FUNCION SE EJECUTA CUANDO HAGO UNA PETICION
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();//ESTA CONFIGURACION ES PARA QUE MI SERVIDOR NO SE ROMPA AL MOMENTO EN QUE SE QUIERA CONECTAR CON EL BROWSER.
});

server.use('/', routes); // configuro mi servidor para que utilice a mis rutas que exporte de index.js. ESTE ES MI ROUTER PRINCIPAL QUE ES EL PRIMER LUGAR DONDE LLEGAN TODOS LOS ENDPOINT. ESTE INVOCA A MIS ROUTES.(dogRouter.js, postRouter.js) ESTE ROUTES ES EL QUE LLEVO A index.js de la carpeta routes.

// Error catching endware. // el .use sirve para decirle al servidor que cuando resiba una req pase por lo que esta dentro de la funcion .
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);// cuando se ejecuta la respuesta se corta la ejecucion
});

module.exports = server; // exporto mi servidorn a mi index.js
