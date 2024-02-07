import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const SET_TEMPERAMENT_FILTER = "SET_TEMPERAMENT_FILTER";
export const SET_ORIGIN_FILTER = "SET_ORIGIN_FILTER";
export const FILTER_DOGS = "FILTER_DOGS";
export const SET_SORT_ORDER = "SET_SORT_ORDER";
export const SET_PAGE = "SET_PAGE";

//obtine tdos los perros y los despacha para el reducer con el type "GET_DOGS".
export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs`);
      dispatch({
        type: GET_DOGS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error al obtener la lista de perros:', error);
    }
  };
}
//obtiene el perro que busco por nombre
export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/dogs?name=${name}`);

      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });

    } catch (error) {
      console.error('Error fetching dogs by name:', error);
    }
  };
}
//obtiene el perro que busco por id.
export const getDogDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/dogs/${id}`);

    dispatch({ type: GET_DOG_DETAILS, payload: response.data });
  } catch (error) {
    console.error('Error fetching dog details:', error);
  }
};
//desoacha el type FILTER_DOGS
export function filterDogs() {
  return (dispatch) => {
    dispatch({
      type: FILTER_DOGS,
    });
  };
}


export function setTemperamentFilter(temperament) {
  return {
    type: SET_TEMPERAMENT_FILTER,
    payload: temperament,
    
  };
}

export function setOriginFilter(origin) {
  return {
    type: SET_ORIGIN_FILTER,
    payload: origin,
  };
}

export function setSortOrder(order) {
  return {
    type: SET_SORT_ORDER,
    payload: order,
  };

}
export function setPage(pageNumber) {
  return {
    type: SET_PAGE,
    payload: pageNumber,
  };

}
