require('dotenv').config();// ES UNA DEPENDENCIA QUE PERMITE LEER A TRAVES DE PROCES.ENV TODAS LAS VARIABLES DE ENTORNO QUE TENGA DECLARADAS EN .ENV
const { Sequelize } = require('sequelize');//sequelize es un orm que permite interactuar con la base de datos(postgres).
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_PORT


} = process.env; // ME TRAIGO MIS VARIABLES DE ENTORNO QUE ESTAN EN .ENV
const DogsModel = require("./models/Dog.js")//TRAIGO MI MODELO
const TemperamentsModel= require("./models/Temperament.js")//TRAIGO MI MODELO

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {// INICIALIZO MI SERVIDOR CON LA BASE DE DATOS. CONECTA MI SERVIDOR CON MI BASE DE DATOS.
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

DogsModel(sequelize)//DEFINIMOS LOS MODELOS A IMPLEMENTAR
TemperamentsModel(sequelize)//DEFINIMOS LOS MODELOS A IMPLEMENTAR
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Dog.belongsToMany(Temperament,{through: "dog_temperament"});// HAGO LA RELACION DE VARIOS A VARIOS CON BELONGSTOMANY Y CREO UNA TABLA INTERMEDIA LLAMADA DOG_TEMPERAMENT.
Temperament.belongsToMany(Dog,{through: "dog_temperament"});

module.exports = {
  ...sequelize.models,// EXPORTO LOS MODELOS. // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, //GUARDO DENTRO DE LA VARIABLE CONN A SEQUELIZE. DE ESTA MANERA EXPORTO UN OBJ QUE TIENE LA PROPIEDAD CONN CON EL VALOR SEQUELIZE. LA IMPORTO PARA REQUERIRLA EN MI INDEX.JS // para importart la conexión { conn } = require('./db.js');
};
