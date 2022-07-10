import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

import { getCharacterDetail, deleteCharacter, setNotification } from "../../../redux/actions";
import Loader from "../../Sections/Loader/Loader";

import waves from "../../../assets/waves/wave.svg";
import iconSplash from "../../../assets/icon-splash.png";
import iconHome from "../../../assets/home.png";
import styles from "./CharacterDetail.module.css";
import iconDelete from "../../../assets/icon-delete.png";

function CharacterDetail() {

  const dispatch = useDispatch();
  const {characterDetail} = useSelector((state) => state);

  const navigate = useNavigate();

  const {idCharacter} = useParams();

  function backHome(){
    navigate("/");
  }

  function deleteItem(){
    dispatch(deleteCharacter(idCharacter));
    dispatch(setNotification("DELETE_ITEM"));
    backHome();
  }

  useEffect(() => {
    dispatch(getCharacterDetail(idCharacter));
    return () => {
      dispatch(getCharacterDetail());
    };
  }, [dispatch, idCharacter]);

  return (
    <>
      {characterDetail.id === undefined ? 
        <div className={styles.LoadingContainer}> <Loader /></div> : 
        (
          <section className={styles.DetailContainer}>
              <button onClick={backHome} className={styles.ButtonHome}><img className={styles.IconHome} src={iconHome} alt="icon-back-to-home"/>Back to Home</button>
              <div className={styles.DetailInfo}>
                <div className={styles.LeftInfo}>
                  <h2 className={styles.Name} >{characterDetail.name}</h2>
                  <img className={styles.Image} src={characterDetail.image} alt="img-character"/>
                  <div className={styles.Details}>
                    <span className={styles.Species} ><b>Specie: </b>{characterDetail.species}</span>
                    <span className={styles.Origin} ><b>Origin: </b>{characterDetail.origin}</span>
                    <h4 className={styles.Gender} ><b>Gender: </b>{characterDetail.gender}</h4>
                    <span className={styles.Status}><b>Status: </b>{characterDetail.status}</span>
                  </div>
                </div>
                <div className={styles.RightInfo}>
                  <h2 className={styles.TitleEpisodes}>Character´s episodes:</h2>
                  {
                    characterDetail.episodes && 
                    characterDetail.episodes?.map((episode,index) => (
                      episode.hasOwnProperty("name") ?
                      <span key={index} className={styles.Episode}><img className={styles.IconEpisode} src={iconSplash} alt="icon-list-episodes" />{episode.name}</span> :
                      <span key={index} className={styles.Episode}><img className={styles.IconEpisode} src={iconSplash} alt="icon-list-episodes" />{episode}</span>
                    ))
                  }
                </div>

                {
                  characterDetail.created && 
                  <div>
                    <button onClick={() => deleteItem()} className={styles.ButtonDelete}><img src={iconDelete} alt="icon-Delete"/></button>
                    <button onClick={() => deleteItem()} className={styles.ButtonDeleteMobile}><img src={iconDelete} alt="icon-Delete"/></button>
                  </div>
                }
                
                <img className={styles.Waves} src={waves} alt="pattern-wave"/>
              </div>
              
          </section>
        )
      }
    </>
  )
}

export default CharacterDetail;

