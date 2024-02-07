const { Router } = require('express');
const router = Router();
const dogRouter = require("./dogRouter");
/* const postRouter = require('./postRouter'); */
const temperamentRouter = require('./temperamentsRouter');
// Configuro las rutas bases 

//todas las rutas definidas en el enrutador se manejarán bajo la ruta base.
             //ruta base    //enrutador
router.use('/temperaments', temperamentRouter);//MUESTRA TEMPERAMENTOS

router.use("/dogs", dogRouter)//MUESTRA PERROS

router.use("/create", dogRouter)//CREA PERROS Y ASOCIA TEMP

module.exports = router;
