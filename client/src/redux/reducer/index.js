import {SET_PAGE, SET_SORT_ORDER, GET_DOGS, GET_BY_NAME, GET_DOG_DETAILS, FILTER_DOGS, SET_TEMPERAMENT_FILTER, SET_ORIGIN_FILTER } from "../actions";

const initialState = {
  allDogs: [],
  dogsCopy: [],
  filteredDogs: [],
  temperamentFilter: null,
  originFilter: null,
  dogDetails: null,
  currentPage : 1,
};


function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_DOGS://en caso que me llegue una action.type "GET_DOGS" se hace una copia del estado y se actualiza los estados allDogs dogsCopy filteredDogs con todos los perros obtenidos.
      return {
        ...state,
        allDogs: action.payload,
        dogsCopy: action.payload,
        filteredDogs: action.payload,
      };

    case GET_BY_NAME://actualiza el estado filteredDogs con el perro que busco por nombre.
      return {
        ...state,
        filteredDogs: action.payload,
        currentPage: 1,
      };

    case GET_DOG_DETAILS://actualiza el estado con el perro que busco por id.
      return {
        ...state,
        dogDetails: action.payload,
      };

    case FILTER_DOGS://filtra por temp y origen.
      let filteredResults = state.dogsCopy;//primero va a tener todos los perros de la copia.
      if (state.temperamentFilter) {
        filteredResults = filteredResults.filter(
          (dog) =>
          (dog.temperament &&
            dog.temperament.includes(state.temperamentFilter)) ||
            (dog.Temperaments &&
              dog.Temperaments.some(//some se utiliza para determinar si al menos un elemento de un array cumple con cierta condición
              (temp) => temp.name === state.temperamentFilter
              ))
              );
              console.log({filteredResults});
      }
      if (state.originFilter === "API") {
        filteredResults = filteredResults.filter((dog) => !dog.created);
      } else if (state.originFilter === "DB") {
        filteredResults = filteredResults.filter((dog) => dog.created);
      }

      return {
        ...state,
        filteredDogs: filteredResults,//se sobrescribe la propiedad filteredDogs con la lista filtrada (filteredResults).
      };


    case SET_TEMPERAMENT_FILTER://activa el SET_TEMPERAMENT_FILTER
      return {
        ...state,
        temperamentFilter: action.payload,//actualiza el estado temperamentFilter
        currentPage: 1,
      };


    case SET_ORIGIN_FILTER://activa el SET_ORIGIN_FILTER
      return {
        ...state,
        originFilter: action.payload,
        currentPage: 1,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        
      };


    case SET_SORT_ORDER:
      let sortedResults = state.filteredDogs.slice(); //slice() sin argumentos crea una copia de todo el array

      if (action.payload === "asc") {
        sortedResults.sort((a, b) => a.name.localeCompare(b.name));//sort ordena el array y localCompare lo ordena ascendentemente.
      } else if (action.payload === "desc") {
        sortedResults.sort((a, b) => b.name.localeCompare(a.name));
      } else if (action.payload === "ascWeight") {
        sortedResults = sortedResults.filter((dog) => dog.weight && dog.weight);//filtra para incluir solo los perros que tienen un peso definido
        sortedResults.sort((a, b) => {
          const weightA = parseInt(a.weight);
          const weightB = parseInt(b.weight);
          return weightA - weightB;// La función de comparación debe devolver un número negativo si a debería ir antes de b, un número positivo si a debería ir después de b, y 0 si son iguales
        });
      } else if (action.payload === "descWeight") {
        sortedResults = sortedResults.filter((dog) => dog.weight && dog.weight);
        sortedResults.sort((a, b) => {//a y b son los numeros que toma
          const weightA = parseInt(a.weight);
          const weightB = parseInt(b.weight);
          return weightB - weightA;
        });
      }

      return {
        ...state,
        filteredDogs: sortedResults,
        currentPage: 1,
      };
    default:
      return state;
  }
}

export default rootReducer;