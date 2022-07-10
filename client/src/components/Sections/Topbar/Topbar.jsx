import React from 'react';

import styles from "./Topbar.module.css";
import img from "../../../assets/rick-and-morty-add-new.png";

import {Link} from "react-router-dom";

function Topbar() {
  return (
    <>
      <div className={styles.ContainerTopbar}>
        <h2 className={styles.TitleButton}>ADD new character</h2>
        <img className={styles.ImgButton} src={img} alt="img-add-new-character" />
        <Link className={styles.Button} to="/newcharacter">CREATE</Link>
      </div> 
    </>
  )
}

export default Topbar;