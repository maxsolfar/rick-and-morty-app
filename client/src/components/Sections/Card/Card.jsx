import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Card.module.css";

import wave from "../../../assets/wave-dark.svg";

function Card({id,name, species, origin, image}) {
  return (
    <>
      <Link className={styles.CardLink} to={`/character/${id}`}>
      <div className={styles.Card}>
        <div className={styles.ImgCardContainer}>
        <img className={styles.ImgCard} src={image} alt="character-img" />
        </div>
        <img className={styles.WaveImg} src={wave} alt="img-wave-section" />
        <span className={styles.Id}>{id}</span>
        <div className={styles.InfoCard}>
          <h2 className={styles.Name}>{name}</h2>
          <div className={styles.BottomCard}>
            <span className={styles.Species}><b>Specie:</b> {species}</span>
            <span className={styles.Origin}><b>Origin:</b> {origin}</span>
          </div>
        </div>
      </div>
      </Link>
    </>
  )
}

export default Card;