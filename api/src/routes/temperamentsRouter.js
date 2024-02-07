const { Router } = require('express');
const { getAllTemperamentsHandler } = require('../handlers/dogsHandlers');

const temperamentRouter = Router();

// ruta donde trae los temperamentos//
temperamentRouter.get("/", getAllTemperamentsHandler);

module.exports = temperamentRouter;