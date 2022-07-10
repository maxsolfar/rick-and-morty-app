import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./NotFound.module.css";
import notFound from "../../../assets/not-found.png"
import notFoundi from "../../../assets/not-found-i.png"
import iconHome from "../../../assets/home.png";

function NotFound() {

  const navigate = useNavigate();

  function backHome(){
    navigate("/");
  }

  return (
    <>
      <section className={styles.Container}>
        <button onClick={backHome} className={styles.ButtonHome}><img className={styles.IconHome} src={iconHome} alt="icon-back-to-home"/>Back to Home</button>
        <div className={styles.ContainerImg}>
          <img className={styles.NotFound} src={notFound} alt="not-found-img" />
          <img className={styles.NotFoundCh} src={notFoundi} alt="not-found-img" />
        </div>
        <span className={styles.SubTitle}>This page you requested could not be found.</span>
      </section>
    </>
  )
}

export default NotFound;