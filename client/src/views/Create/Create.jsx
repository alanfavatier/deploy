import axios from "axios";
import React, { useState, useEffect } from "react";
import validator from "./Validator";
import styles from "./Create.module.css"; // Importa los estilos CSS Modules
import { Link } from "react-router-dom";

const Create = () => {
  const [errors, setErrors] = useState({});
  const [dogData, setDogData] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: "",
    image: "",
  });

  const [allTemperaments, setAllTemperaments] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/temperaments");
        setAllTemperaments(response.data);
      } catch (error) {
        console.error("Error al obtener los temperamentos:", error);
      }
    };

    fetchTemperaments();
  }, []);

  const handleTemperamentChange = (selectedTemperaments) => {//selectedTemperaments parece ser la lista de temperamentos seleccionados
    setDogData((prevData) => ({
      ...prevData,
      temperament: selectedTemperaments.join(", "),// utiliza el patrón del estado anterior (prevData) y crea un nuevo objeto que conserva todas las propiedades del estado anterior (...prevData) pero actualiza la propiedad temperament con los temperamentos seleccionados unidos por comas.
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      temperament: validator({ temperament: selectedTemperaments }).temperament,
    }));
  };

  const handleChange = (e) => {
    const newDogData = { ...dogData, [e.target.name]: e.target.value };//actualiza la propiedad correspondiente según el nombre del campo de entrada y su nuevo valor
    setDogData(newDogData);
    setErrors(validator(newDogData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si todos los campos están vacíos
    if (
      Object.values(dogData).every((value) => value === "") ||
      Object.values(dogData).every((value) => value === null)
    ) {
      alert("Faltan datos. Todos los campos son obligatorios.");
      return;
    }
    

    if (Object.keys(errors).length === 0) {//Object.keys(errors): Devuelve un array con las claves del objeto errors
      try {
        const response = await axios.post(`http://localhost:3001/create`, dogData);
        console.log('Respuesta de la base de datos:', response.data);
        setSuccessMessage(alert("perro creado exitosamente"));
        window.location.href="/home"
        setErrorMessage(null); // Limpiar el mensaje de error si la creación es exitosa
      } catch (error) {
        console.error('Error al enviar datos a la base de datos:', error);
      }
    } else {
      console.log('Formulario con errores');
      setErrorMessage(null); // Limpiar el mensaje de error si hay errores en el formulario
    }
  };

  const handleCardClick = () => {
    window.location.href = `/home`;
  };

  return (
    <div className={styles.formContainer}>
      <Link to={`/home`} onClick={handleCardClick}>
        <button className={styles.btnvolver}>Volver a la Pagina de Inicio</button>
      </Link>
      <form onSubmit={handleSubmit}>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Nombre</label>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Nombre..."
            value={dogData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>


        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="image">image</label>
          <input
            className={styles.input}
            name="image"
            type="text"
            placeholder="imagen..."
            value={dogData.image}
            onChange={handleChange}
          />
        </div>


        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="height_min">Altura minima</label>
          <input
            className={styles.input}
            name="height_min"
            type="number"
            placeholder="Altura minima..."
            value={dogData.height_min}
            onChange={handleChange}
          />
          {errors.height_min && <p className={styles.error}>{errors.height_min}</p>}
        </div>


        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="height_max">Altura maxima</label>
          <input
            className={styles.input}
            name="height_max"
            type="number"
            placeholder="Altura maxima..."
            value={dogData.height_max}
            onChange={handleChange}
          />
          {errors.height_max && <p className={styles.error}>{errors.height_max}</p>}
        </div>


        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="weight_min">Peso minimo</label>
          <input
            className={styles.input}
            name="weight_min"
            type="number"
            placeholder="Peso minimo..."
            value={dogData.weight_min}
            onChange={handleChange}
          />
          {errors.weight_min && <p className={styles.error}>{errors.weight_min}</p>}
        </div>


        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="weight_max">Peso maximo</label>
          <input
            className={styles.input}
            name="weight_max"
            type="number"
            placeholder="Peso maximo..."
            value={dogData.weight_max}
            onChange={handleChange}
          />
          {errors.weight_max && <p className={styles.error}>{errors.weight_max}</p>}
        </div>



        <div className={styles.formGroup}>
          <label className={styles.label}>Temperamentos</label>
          {allTemperaments.map((temperament) => (//Para cada temperamento, se genera un bloque de JSX.
            <div key={temperament} className={styles.temperamentContainer}>
              <input className={styles.checkbox}
                type="checkbox"//
                id={temperament}
                value={temperament}
                checked={dogData.temperament.includes(temperament)}//checked determina si la casilla debe estar marcada o desmarcada según si el temperamento actual está incluido en los temperamentos seleccionados 
                onChange={(e) => {

                  const selectedTemperaments = e.target.checked//si se hace click en la casilla
                    ? [...dogData.temperament.split(", "), temperament]//crear un nuevo array que incluye todos los temperamentos seleccionados previamente y agrega el nuevo temperamento (temperament) que el usuario acaba de seleccionar.
                    : dogData.temperament
                      .split(", ")
                      .filter((temp) => temp !== temperament);//esto es para deseleccionar una casilla utilizando filter.
                  handleTemperamentChange(selectedTemperaments);// Esta función actualiza el estado en consecuencia, con el nuevo array selectedTemperaments
                }}
              />
              <label htmlFor={temperament}>{temperament}</label>
            </div>
          ))}
          {errors.temperament && (
            <p className={styles.error}>{errors.temperament}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="life_span">Esperanza de Vida</label>
          <input
            className={styles.input}
            name="life_span"
            type="number"
            placeholder="Esperanza de Vida..."
            value={dogData.life_span}
            onChange={handleChange}
          />
          {errors.life_span && <p className={styles.error}>{errors.life_span}</p>}
        </div>

        {errors.name ? null : <button type="submit" className={styles.btncrearraza}>Crear Raza</button>}
      </form>
    </div>
  );
};

export default Create;
