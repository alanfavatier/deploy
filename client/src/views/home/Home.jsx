import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getDogs, setPage } from "../../redux/actions";

import Cards from "../../components/Cards/Cards";
import Navbar from "../../components/Navbar/Navbar";
import DogFilters from "../../components/Filter/Filter";
import "./Home.style.css";

const Home = () => {
  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.filteredDogs);//useSelector para extraer el estado filteredDogs del store de Redux. contiene a todos los perros
  const currentPage = useSelector((state) => state.currentPage);
  const dogsPerPage = 8;
  const totalDogs = allDogs.length;




  //  PARA EL PAGINADO UTILICE LA FORMULA DEL PAGINADO 
  const indexOfLastDog = currentPage * dogsPerPage; //ultimo perro (1 * 8)
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;//primer perro (8-8)
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // el método slice se utiliza para seleccionar una porción del array allDogs, se le pasan dos parametros
  //indexOfFirstDog: 0
  //indexOfLastDog: 8

  const totalPages = Math.ceil(totalDogs / dogsPerPage); // totalPages: Calcula el número total de páginas dividiendo la cantidad total de perros por la cantidad de perros por página y redondeando hacia arriba. (264 perros / 8perros por pagina)= 33paginas







  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);//actualiza el estado con el valor de mi campo de busqueda
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(searchString));//cuando se envia los datos del campo de busqueda se despacha a redux (especificamente al controlador getByName ) el estado de searchString
  };

  const handlePageChange = (pageNumber) => {//pageNumber representaría el número de la página a la que el usuario quiere navegar.
    dispatch(setPage(pageNumber))

  };

  useEffect(() => {
    dispatch(getDogs());// se despacha a redux (especificamente al controlador getDogs ) el estado de currentPage
  }, [dispatch]);



  const handleCreateDog = () => {
    window.location.href = '/create';
  };


  return (
    <div className="home">
      <h2 className="home-title">Bienvenido a mi Página de Perros</h2>
      <button onClick={handleCreateDog} className="crearPerro">Crear Perro</button>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <DogFilters />
      <Cards

        currentDogs={currentDogs}
      />

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> {/* Botón "Anterior": Desencadena la función handlePageChange para ir a la página anterior. Está deshabilitado si ya estás en la primera página (currentPage === 1). */}
          Anterior
        </button>
        <span>{currentPage}</span> {/* Span con el número de página actual: Muestra el número de la página actual. */}

        {currentPage < totalPages ?
          <button onClick={() => handlePageChange(currentPage + 1)}>

            Siguiente
          </button>
          : null}

        {/* <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage < totalPages}>
          
        </button> */}
      </div>
    </div>
  );
};

export default Home;