import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [dogDetails, setDogDetails] = useState(null);


  const handleCardClick = () => {
    window.location.href = `/home`;
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/dogs/${id}`).then(({ data }) => {
      setDogDetails(data);
    }).catch(error => {
      console.error("Error fetching dog details:", error);
    });
  }, [id]);

  if (!dogDetails) {
    return <div>Loading...</div>;
  }

  const { name, weight, height_min, height_max, height, life_span, reference_image_id, weight_min, weight_max, image, } = dogDetails;

  return (
    <div className={styles.detailContainer}>
      <Link to={`/home`} onClick={handleCardClick}>
        <button className={styles.botonvolver}>Volver a la Pagina de Inicio</button>
      </Link>
      <h2>ID: {id}</h2>
      <p className={styles.dogInfo}>Name: {name}</p>
      <img className={styles.dogImage} src={`https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`} alt={name} />
      <img src={image} alt={name} className={styles.dogImage} />
      <h2 className="name">
        Temperaments: {dogDetails.Temperaments ? dogDetails.Temperaments.map(temp => temp.name).join(',') : dogDetails.temperament}
      </h2 >
      {weight_min && <p className={styles.dogInfo}>Peso Min: {weight_min}</p>}
      {weight_max && <p className={styles.dogInfo}>Peso Max: {weight_max}</p>}
      {!weight_min && !weight_max && <p className={styles.dogInfo}>Peso: {weight.imperial}</p>}

      {height_min && <p className={styles.dogInfo}>Altura Min: {height_min}</p>}
      {height_max && <p className={styles.dogInfo}>Altura Max: {height_max}</p>}
      {!height_min && !height_max && <p className={styles.dogInfo}>Peso: {height.imperial}</p>}
      <p className={styles.dogInfo}>Life Span: {life_span}</p>
    </div>
  );
};

export default Detail;