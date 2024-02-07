const axios = require("axios")
const { Dog, Temperament } = require("../db")
const { Op } = require('sequelize');
const { depuracionDeLaInfo } = require("../utils/index")
const {
    API_KEY
} = process.env;
//controlador para obtener temperamentos//
const getAllTemperaments = async () => {
    try {
        const temperamentsFromDB = await Temperament.findAll();// findAll obtiene todos los registros de la tabla Temperament.
        if (temperamentsFromDB.length === 0) {//Verifica si no se encontraron temperamentos en la base de datos 
            return await getAndSaveTemperaments();//Si no hay temperamentos en la base de datos, llama a la función getAndSaveTemperaments para obtener y guardar los temperamentos desde la API.
        }
        return temperamentsFromDB.map((temperament) => temperament.name);//Si se encontraron temperamentos en la base de datos, utiliza map para extraer los nombres de los temperamentos y retorna una array con estos nombres.
    } catch (error) {
        const errorMessage = `Error en getAllTemperaments: ${error.message}`;
        if (error.name === 'SequelizeConnectionRefusedError') {
            // Manejar el error de conexión a la base de datos
            console.error('Error de conexión a la base de datos:', error);
        }
        throw new Error(errorMessage);
    }

};

const getAndSaveTemperaments = async () => {
    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const breeds = response.data;
        if (!breeds || breeds.length === 0) {
            throw new Error('No se recibieron datos válidos de la API de razas.');
        }
        // reduce:itera sobre las razas y extraer los temperamentos únicos.
        const allTemperaments = breeds.reduce((temperaments, breed) => {
            if (breed.temperament) {//split:divide la cadena en una matriz usando la coma como separador. map itera sobre cada elemento de la matriz resultante después de la división.(.trim )elimina los espacios en blanco al principio y al final de cada temperamento
                const breedTemperaments = breed.temperament.split(',').map((t) => t.trim());
                temperaments.push(...breedTemperaments);
            }
            return temperaments;
        }, []);//El último argumento de reduce es el valor inicial del acumulador, en este caso, un array vacío [].

        // Utiliza un Set para eliminar duplicados de la matriz allTemperaments
        const uniqueTemperaments = [...new Set(allTemperaments)];//utiliza el spread operator (...) para convertir el Set en una nueva matriz llamada uniqueTemperaments
        if (uniqueTemperaments.length === 0) {//verifica no hay temperamentos unicos
            throw new Error('No se encontraron temperamentos únicos.');
        }
        //bulkCreate crea registros en la base de datos en el modelo Temperament para cada temperamento único.
        await Temperament.bulkCreate(uniqueTemperaments.map((name) => ({ name })));
        //.map transforma cada nombre de temperamento en un objeto con la propiedad name, que es el formato que bulkCreate espera.
        return uniqueTemperaments;
    } catch (error) {
        throw new Error(`Error en getAndSaveTemperaments: ${error.message}`);
    }
};

//ESTE CONTROLLER CREA UN NUEVO PERRO EN LA BDD CON LOS TEMPERAMENTOS ASOCIADOS DATOS//

const createDogDB = async (name, weight_min, weight_max, height_min, height_max, life_span, temperament, image) => {
    try {//Utiliza el metodo create de sequelice para crear un nuevo registro de perro en la base de datos con los datos proporcionados.
        const newDog = await Dog.create({ name, weight_min, weight_max, height_min, height_max, life_span, image });
        //split:Divide la cadena de temperamentos en un array utilizando comas como separadores.map itera sobre el array y trim elimina los espacios en blanco alrededor de cada temperamento.
        const temperamentsArray = temperament.split(",").map((t) => t.trim());

        const temperaments = await Promise.all(//Promise.all recibe un array de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas en el array se han resuelto o alguna de ellas es rechazada
            temperamentsArray.map(async (temp) => {
                return await Temperament.findOrCreate({ where: { name: temp } });//findOrCreate de Sequelize para buscar un temperamento en la base de datos con el nombre proporcionado. Si no existe, lo crea.
                //El resultado de cada operación es una promesa.
            })
        );
        //newDog.setTemperaments se utiliza para asociar los temperamentos con el perro recién creado (newDog).
        await newDog.setTemperaments(temperaments.map((t) => t[0]));//mapea el array temperaments para obtener solo las instancias de temperamentos
        // el primer elemento ([0]) es la instancia del temperamento y el segundo elemento ([1]) es un booleano que indica si el temperamento fue creado o encontrado.


        return newDog;
    } catch (error) {
        throw error;
    }
};

      //este controller me busca por nombre un perro sea de la api o de la bdd//

const getDogById = async (id, source) => {
    let dog;

    if (source === "api") {
        // Si la fuente es la API, realiza una petición GET y guarda los datos del objeto en 'dog'.
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`);
        dog = response.data;
    } else {
        // Si la fuente es diferente de la API, busca el perro en la base de datos utilizando findByPk incluyendo el temeramento asociado.
        dog = await Dog.findByPk(id, {
            include: {
                model: Temperament,
                attributes: ["name"]
            },
        },);
    }
    return dog;
};


//--------CONTROLADOR PARA MOSTRAR TODOS LOS PERROS TANTO DE LA BDD Y DE LA API--------//
const getAllDogs = async () => {
    try {
        // Obtener todos los perros de la base de datos
        const dogsDB = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: { attributes: [] } // Para evitar incluir información adicional de la tabla de relación
            },
        });

        // Obtener información de la API
        const infoApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
        const dogsApi = depuracionDeLaInfo(infoApi);

        // Combinar datos de la base de datos y la API
        const allDogs = [...dogsDB, ...dogsApi];

        return allDogs;
    } catch (error) {//manejo de errores
        console.error(error);

        if (error.name === 'SequelizeDatabaseError') {
            throw new Error("Error en la base de datos al obtener la información de todos los perros.");
        } else if (error.response && error.response.status === 403) {
            throw new Error("Acceso prohibido a la API de perros. Verifica tu clave de API.");
        } else {
            throw new Error("Error al obtener la información de todos los perros.");
        }
    }
};

                 //controlador para buscar por nombre//
const getDogByName = async (name) => {
    try {
        const infoApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
        const dogsApi = depuracionDeLaInfo(infoApi);

        const dogFiltered = dogsApi.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));//Filtra los perros de la API basándose en si el nombre del perro (ignorando mayúsculas y minúsculas) incluye la cadena de búsqueda proporcionada.

        const dogBDD = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`//op.ilike ignora mayusculas y minusculas al traer los nombres de los perro. el parametro que se le pasa es el que quiero buscar
                }
            }
        });

        const combinedResult = [...dogFiltered, ...dogBDD];

        if (combinedResult.length === 0) {
            return { message: "No se encontraron perros con ese nombre." };
        }

        return combinedResult;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener la información del perro por nombre.");
    }
};

// CONTROLADOR PARA BUSCAR POR RAZA





module.exports = {// EXPORTO LA FUNCION CONTROLADORA PARA CONECTARLA CON MI HANDLER.
    createDogDB,
    getDogById,
    getAllDogs,
    getDogByName,
    getAndSaveTemperaments,
    getAllTemperaments,

}

//LOS CONTROLLER COMO ESTE SE COMUNICAN DIRECTAMENTE CON LA BDD PARA CREAR UN NUEVO PERRO DENTRO DE LA TABLA DE DOG-