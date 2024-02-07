
const { createDogDB, getDogById, getAllDogs, getDogByName, getAllTemperaments } = require("../controllers/dogsControllers")// importamos mis controllers para poder usarlos en mis handler

//------------------------rutas get---------------------//

//-------handler para obtener temperamentos-------//
const getAllTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await getAllTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// este handler es para obtener todos los perros o uno si busco por nombre.
const getDogsHandler = async (req, res) => {
    const { name } = req.query;

    try {
        if (name) {
            // Si existe name, busca al perro por nombre.
            const dogByName = await getDogByName(name);

            if (dogByName.message) {
                // Si el resultado es un objeto con un mensaje, significa que no se encontró el nombre. y muestra el mensaje 
                res.status(404).json({ message: dogByName.message });
            } else {
                res.status(200).json(dogByName);
            }
        } else {
            // Si no hay name, trae todos los perros.
            const response = await getAllDogs();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// controller para traer un perro por id//
const getDogsDetailHandler = async (req, res) => {

    const { id } = req.params
    //SE GUARDA DENTRO DE SOURCE EL VALOR DE "bdd" O "api" SEGUN EL ID QUE ME LLEGUE.
    const source = isNaN(id) ? "bdd" // true si no es un num.
        : "api"
    try {
        const response = await getDogById(id, source)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//------------------------rutas post ------------------------------------//

//------------ESTE CONTROLLER CREA A UN NUEVO PERRO-------//

const createDogHandler = async (req, res) => {
    const { name, weight_min, weight_max, height_min, height_max, life_span, temperament, image } = req.body

    try {
        const response = await createDogDB(name, weight_min, weight_max, height_min, height_max, life_span, temperament, image)

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


module.exports = {
    getDogsDetailHandler,
    getDogsHandler,
    createDogHandler,
    getAllTemperamentsHandler

}