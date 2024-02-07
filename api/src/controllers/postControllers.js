/* const { Temperament, Dog } = require("../db");
//-----ESTE CONTROLLER CREA UN NUEVO TEMPERAMENTO EN LA BASE DE DATOS Y LUEGO ASOCIA EL TEMPERAMENTO CON EL PERRO.
const createPostDB = async (name, dogId) => {
  try {
    // Crea un nuevo temperamento en la base de datos
    const temperament = await Temperament.create({ name }); 
    // Obtiene la instancia del perro basada en el dogId
    const dog = await Dog.findByPk(dogId);//findByPk es un método de Sequelize que se utiliza para buscar un registro por su clave primaria 

    // Asocia el temperamento con el perro utilizando el método addDogs
    if (dog) {
      await temperament.addDogs(dog);
    } else {
      throw new Error("Perro no encontrado");
    }

    return temperament;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPostDB
};
 */
