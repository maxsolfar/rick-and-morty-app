import React from "react";

import styles from "./Loader.module.css";

import loading from "../../../assets/loader/loading.png";
import searching from "../../../assets/loader/searching.png";

function Loader({type}) {
  return (
    <>
      <div className={styles.ContainerLoader}>
				<img className={styles.Title} src={type=== "SEARCHING" ? searching : loading} alt="loading-img" />
				<div className={styles.ContainerCharacters}>
					<div className={styles.CharacterA}></div>
					<div className={styles.CharacterB}></div>
					<div className={styles.CharacterC}></div>
				</div>
      </div>
    </>
  );
}

export default Loader;
