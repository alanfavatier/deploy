import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTemperamentFilter, setOriginFilter, filterDogs, setSortOrder } from "../../redux/actions";
import styles from "./Filter.module.css";
import axios from "axios";

const DogFilters = () => {
  const dispatch = useDispatch();

  const [temperament, setTemperament] = useState("");



  const [allTemperaments, setAllTemperaments] = useState([]);

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

  //Actualizar el estado con el nuevo valor del filtro (temperamento u origen) mediante la acción correspondiente (setTemperamentFilter o setOriginFilter).
  //Despachar la acción filterDogs para activar la lógica de filtrado de perros basada en los filtros actualizados.
  const handleTemperamentFilter = (event) => {//el parametro que se le pasa(temperament) es el que tiene el handleTemperamentFilter. (handleTemperamentFilter("Calm"))
    const temperamentSelected = event.target.value
    setTemperament(temperamentSelected)
    
    dispatch(setTemperamentFilter(temperamentSelected));
    dispatch(filterDogs());
  };

  

  const handleOriginFilter = (origin) => {
    dispatch(setOriginFilter(origin));
    dispatch(filterDogs());
  };



  const handleSortOrder = (order) => {
    dispatch(setSortOrder(order));//se está despachando la acción creada por setSortOrder con el nuevo orden como argumento.
  };

  return (
    <div className={styles.contenedorBotones}>
      {/* Botones para filtrar por temperamento */}
      <select value={temperament} onChange={handleTemperamentFilter} className={styles.botones}>
        {allTemperaments.map((element) => {
          return (
            <option value={element}>{element} </option>
          )
        })}
      </select>

      {/* Botones para filtrar por origen */}
      <button onClick={() => handleOriginFilter("API")} className={styles.botones}>API</button>
      <button onClick={() => handleOriginFilter("DB")} className={styles.botones}>Database</button>

      {/* Botones para ordenar*/}
      <button onClick={() => handleSortOrder("asc")} className={styles.botones}>Sort A-Z</button>
      <button onClick={() => handleSortOrder("desc")} className={styles.botones}>Sort Z-A</button>
      <button onClick={() => handleSortOrder("ascWeight")} className={styles.botones}>Sort Asc by Weight</button>
      <button onClick={() => handleSortOrder("descWeight")} className={styles.botones}>Sort Desc by Weight</button>
    </div>
  );
};

export default DogFilters;
