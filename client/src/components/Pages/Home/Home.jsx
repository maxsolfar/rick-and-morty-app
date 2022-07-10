import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {getAllCharacters, getPage, setNotification} from "../../../redux/actions";

import Topbar from "../../Sections/Topbar/Topbar";
import CardsGrid from "../../Sections/CardsGrid/CardsGrid";
import Animation from "../../Sections/Animation/Animation";


import styles from "./Home.module.css";

function Home() {
  
  const dispatch = useDispatch();
  const {allCharacters, notification} = useSelector((state) => state);

  useEffect(()=>{
    if(allCharacters.length === 0 || notification !== "" ){
      dispatch(getAllCharacters());
      dispatch(getPage(1));
      setTimeout(()=>{
        dispatch(setNotification(""));
      },4000)
    }
  },[dispatch,allCharacters, notification])   

  
  return (
    
      <>

        <Topbar/>
        <section className={styles.MainContainer}>
          <CardsGrid/>
        </section>
        <Animation/>
        
      </>
  );
}

export default Home;
