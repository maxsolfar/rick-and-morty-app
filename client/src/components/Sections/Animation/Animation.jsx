import React from 'react';

import animation1 from "../../../assets/rick-bg.png";
import animation2 from "../../../assets/morty-bg.png";
import animation3 from "../../../assets/rick.png";
import animation4 from "../../../assets/morty-a.png";

import styles from "./Animation.module.css";

function Animation() {
  return (
    <>
        <section className={styles.ContainerAnimation}>
            <img className={styles.Animation1} src={animation1} alt="img-rick" />
            <img className={styles.Animation3} src={animation3} alt="img-rick" />
            <img className={styles.Animation2} src={animation2} alt="img-morty" />
            <img className={styles.Animation4} src={animation4} alt="img-rick" />
        </section>
    </>
  )
}

export default Animation;