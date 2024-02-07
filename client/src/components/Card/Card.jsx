import { Link } from "react-router-dom";
import "./Card.style.css";


const Card = ({ dog }) => {
  const { id, name, weight, image, weight_min,weight_max } = dog;

  const handleCardClick = () => {
    window.location.href = `/home/${id}`;
  };
  return (
    <div className="card-container">
      <Link to={`/home/${id}`}  onClick={handleCardClick} className="name">
        <h2 className="name">ID: {id}</h2>
        <h2 className="name">Nombre: {name}</h2>
        <img src={image} alt={name} className="dog-image" />
               <h2 className="name">
          Temperaments: {dog.Temperaments ? dog.Temperaments.map(temp => temp.name).join(',') : dog.temperament}
        </h2 >
        {weight_min && <p className="name">Peso Min: {weight_min}</p>}
        {weight_max && <p className="name">Peso Max: {weight_max}</p>}
        {!weight_min && !weight_max && <p className="name">Peso: {weight}</p>}
      </Link>
    </div>
  );
};

export default Card;
