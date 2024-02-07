// Validator.js
const validator = (data) => {
    const errors = {};
  
    // Validación del nombre
    if (!data.name) {
      errors.name = "El nombre es obligatorio";
    } else if (!/^[a-zA-Z ]+$/.test(data.name)) {
      errors.name = "El nombre no puede contener números ni caracteres especiales";
    }


  
    // Validación de la altura
    if (!data.height_min) {
      errors.height_min = "La altura es obligatoria";
    } else if (data.height_min < 15) {
      errors.height_min = "La altura minima es 15cm";
    }
    if (!data.height_max) {
      errors.height_max = "La altura es obligatoria";
    } else if (data.height_max > 101) {
      errors.height_max = "La altura maxima es 100cm";
    }
  
    // Validación del peso
    if (!data.weight_min) {
      errors.weight_min = "El peso es obligatorio";
    } else if (data.weight_min < 0) {
      errors.weight_min = "El peso minimo es 1kg";
    }
    if (!data.weight_max) {
      errors.weight_max = "El peso es obligatorio";
    } else if (data.weight_max > 101) {
      errors.weight_max = "El peso maximo es de 100kg";
    }
  
    // Validación de la esperanza de vida
    if (!data.life_span) {
      errors.life_span = "La esperanza de vida es obligatoria";
    } else if (data.life_span < 0) {
      errors.life_span = "La esperanza de vida no puede ser negativa";
    }
  
    return errors;
  };
  
  export default validator;
  