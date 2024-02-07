import React from "react";
import Card from "../Card/Card";
import "./Cards.style.css";

const Cards = ({ currentDogs }) => {


  return (
    //ESTA ES LA LISTA DE MIS TARJETAS
    <div className="card-list">
      {currentDogs.map((dog) => (//currentDogs tiene 8 perros
        <Card key={dog.id} dog={dog} />//Mapea sobre el array currentDogs y para cada perro, renderiza el componente Card, pasándole el perro como prop y utilizando su id como clave (key).
      ))}

      
    </div>
  );
};


export default Cards;

