import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {getCharactersByName, reloadCharacters, getPage, cleanSearch} from "../../../redux/actions";

import styles from "./SearchBar.module.css";
import refresh from "../../../assets/refresh2.png";
import Loader from '../Loader/Loader';

function Navbar({paginate}) {

  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");

  const inputRef = useRef();

  const dispatch = useDispatch();

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function onKeyUp (e) {
    if (e.charCode === 13) {
      dispatch(cleanSearch());
      dispatch(getCharactersByName(search));
      setNotification("SEARCHING");
      setSearch("");
      setTimeout(()=>{
        dispatch(getPage(1));
        paginate(1); 
        setNotification("");
      },4300)
    }
  }

  function reloadPage(e) {
    dispatch(reloadCharacters());
    dispatch(getPage(1));
    paginate(1); 
  }

  useEffect(()=>{
    inputRef.current.focus();
  });


  return (
    <>
    
      {
        notification === "SEARCHING" &&
        <section className={styles.ContainerLoader}>
          <Loader type={"SEARCHING"}/>
        </section>
        
      }
      <section className={styles.ContainerNav}>
        <nav className={styles.Navbar}>
          <div className={styles.InputContainer}>
          <input
            className={styles.InputSearch}
            type="text"
            ref={inputRef}
            placeholder="Type the character to search..."
            value={search}
            onKeyPress={onKeyUp}
            onChange={(e) => handleChange(e)}
          />
          <i className={styles.IconSearch}></i>
        </div>
      </nav>
      <span onClick={reloadPage} className={styles.Reload}><img className={styles.Refresh} src={refresh} alt="icon-refresh" />RELOAD</span>
      </section>
      
    </>
  )
}

export default Navbar;