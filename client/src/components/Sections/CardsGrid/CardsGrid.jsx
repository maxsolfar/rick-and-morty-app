import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import {reloadCharacters, getPage, nPages} from "../../../redux/actions";
import styles from "./CardsGrid.module.css";
import logo from "../../../assets/rick-and-morty.png";
import NoResults from "../../../assets/loader/no-results.png";
import iconAdd from "../../../assets/icon-add.png";
import SearchBar from '../SearchBar/SearchBar';
import Pagination from "../Pagination/Pagination";
import Loader from "../../Sections/Loader/Loader";


function CardsGrid() {

  const { allCharacters, characters, savedPage, notification, numberPages } = useSelector((state)=> state);

  const dispatch = useDispatch();

  function reloadPage(e) {
    dispatch(reloadCharacters());
    dispatch(getPage(1));
    paginate(1); 
  }
  /*
   * Pagination
   */
  const [currentPage, setCurrentPage] = useState(savedPage);
  const [charactersPerPage, setCharactersPerPage] = useState(12);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);


  useEffect(()=>{
    if(window.innerWidth < 800){
      setCharactersPerPage(6);
      dispatch(nPages(3));
    }
  },[dispatch]);

  return (
    <> 
      {allCharacters.length === 0  || notification !== "" ? <Loader /> :
      <>
      <div className={styles.MenuMobile}>
          <input className={styles.MenuToggle} id="menu-toggle" type="checkbox" />
          <label className={styles.MenuButtonContainer} htmlFor="menu-toggle">
            <div className={styles.MenuButton}></div>
          </label>
          <ul className={styles.Menu}>
            <li><Link to="/newcharacter"><img src={iconAdd} alt="create-icon"/> Create Character</Link></li>
            <li  onClick={reloadPage}>Reload Characters</li>
          </ul>
        </div>
      <section className={styles.ContainerLogo}>
        <img src={logo} className={styles.Logo} alt="img-logo"/>

      </section>
      <SearchBar paginate={paginate}/>
      {characters.length === 0 ? <div className={styles.NoResultsContainer}> <img className={styles.NoResults} src={NoResults} alt="no-results-img" /></div> : 
      <>
        <section className={styles.CardsContainer}>
        {currentCharacters && currentCharacters?.map((character, index)=>(
          <Card 
          key={index}
          id={character.id}
          name={character.name}
          species={character.species}
          origin={character.origin}
          image={character.image}
          episodes={character.episodes}
          />
        ))}

      </section>
      
      <Pagination
        charactersPerPage={charactersPerPage}
        totalCharacters={characters.length}
        paginate={paginate}
        currentPage={currentPage}
        numberLimit={numberPages}
      />
      </>
      }
      
    </>}
    </>
  )
}

export default CardsGrid;