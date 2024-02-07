const { Router } = require('express'); 
const { getDogsHandler, getDogsDetailHandler, createDogHandler, getAllTemperamentsHandler } = require('../handlers/dogsHandlers');

const dogRouter = Router();  //DEFINO MIS RUTAS 

//ruta donde me muestra tdos los perros o uno si es que busco por nombre//
dogRouter.get("/", getDogsHandler)

//ruta que me muestra un perro por id//
dogRouter.get("/:id", getDogsDetailHandler)

//ruta para crear un perro//
dogRouter.post("/", createDogHandler)

//ruta para traer todos los temperamentos//
dogRouter.get("/temperaments", getAllTemperamentsHandler);


module.exports = dogRouter;