import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';

import { getAllEpisodes, getAllLocations, postCharacter, setNotification } from "../../../redux/actions";

import Loader from "../../Sections/Loader/Loader";

import styles from "./CreateCharacter.module.css";
import iconHome from "../../../assets/home.png";

import waves from "../../../assets/waves/wave2.svg";
import newcharacter from "../../../assets/new-character.png";
import createcharacter from "../../../assets/create-char.png";

import iconSplash from "../../../assets/icon-splash.png";

function CreateCharacter() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {episodes, locations, notification} = useSelector((state) => state);


  const initialInputs = {
    name: "",
    image: "",
    species: "",
    gender: "",
    status: "",
    origin: "",
    episodes: []
  }
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState(initialInputs);


  const handleChange = (e)=> {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validateInput({
        ...input,
        [e.target.name]: e.target.value
      })
    );
  }

  const handleSelect = (e)=> {
    if(!input.episodes.includes(e.target.value)){
      setInput({
        ...input,
        episodes: [...input.episodes, e.target.value]
      })
      setErrors(
        validateInput({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
    else{
      console.log("Item is already listed");
    }
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.image &&
      !errors.species &&
      !errors.gender &&
      !errors.origin &&
      !errors.status &&
      !errors.episodes
    ) {
    dispatch(postCharacter(input));
    dispatch(setNotification("CREATED_CHARACTER"));
    setInput(initialInputs);
    }
    else{
      console.log("Please complete the required fields above");
    }

  }

  function backHome(){
    navigate("/");
  }

  useEffect(()=>{
    dispatch(getAllEpisodes());
    dispatch(getAllLocations());
    setTimeout( ()=>{
        setErrors(
          validateInput({
            ...input
          })
    )},800);

  },[dispatch]) 


  /* regex */
  const noEmpty = /\S+/;
  const validateText = /^(?=.*?[A-Za-z])[A-Za-z+\s]+$/; 
  const validateUrl = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
  const validateWords = /^.{5,20}$/;

  const validateInput = (input) => {
    let errors = {};
    if (
      !noEmpty.test(input.name) ||
      !validateText.test(input.name) ||
      input.name.length < 4
    ) {
      errors.name = "Letters only, no special characters or numbers.";
    }
    if (!validateUrl.test(input.image))
    {
      errors.image = "Please enter a valid URL.";
    }
    if (
    !noEmpty.test(input.species) ||
    !validateText.test(input.species) ||
    !validateWords.test(input.species)
    ) {
      errors.species =
        "Letters only, Higher than 5 characters and less than 20";
    }
    if (input.origin === "")
    {
      errors.origin =
        "Origin is required";
    }
    if (input.gender === "")
    {
      errors.gender =
        "Gender is required";
    }
    if (input.status === "")
    {
      errors.status =
        "Status is required";
    }
    if (input.episodes.length === 0)
    {
      errors.episodes =
        "At least 1 Episode required.";
    }
    return errors;
  };

  return (

    <>
      {
        notification === "CREATED_CHARACTER" && 
        <section className={styles.ContainerNoti}>
          <img className={styles.imgModal} src={createcharacter}  alt="recipe-created-img"/>
          <h2 className={styles.TitleModal}>Character has been Added</h2>
          <span className={styles.TextModal}>You can keep adding more characters as you want.</span>
          <div className={styles.ButtonContainer} >
            <button className={styles.ButtonBackHome} onClick={(e)=> backHome(e)}>Back Home</button>
          </div>
        </section>
      }
      {episodes.length === 0 ? 
        
        <div className={styles.LoadingContainer}> <Loader /></div> :
        (
          
          <section className={styles.CreateContainer}>
              <button onClick={backHome} className={styles.ButtonHome}><img className={styles.IconHome} src={iconHome} alt="icon-back-to-home"/>Back to Home</button>
              <div className={styles.CreateForm}>
                <h2 className={styles.Title}>CREATE A NEW CHARACTER</h2>
                
                <form className={styles.Form} onSubmit={(e)=>{handleSubmit(e)}}>

                  
                  <div className={styles.InputContainer}>
                    <span className={styles.Errors}>{errors.name}</span>
                    <input className={styles.Input}
                      type="text"
                      name="name"
                      placeholder="Character´s Name"
                      value={input.name}
                      onChange={(e) => handleChange(e)} 
                    />
                    <i className={styles.IconInput}></i>
                  </div>

                  <div className={styles.InputContainer}>
                    <span className={styles.Errors}>{errors.image}</span>
                    <input className={styles.Input}
                      type="text"
                      name="image"
                      placeholder="Url Character´s Image"
                      value={input.image}
                      onChange={(e) => handleChange(e)} 
                    />
                    <i className={styles.IconInput}></i> 
                  </div>

                  <div className={styles.InputContainer}>
                    <span className={styles.Errors}>{errors.species}</span>
                      <input className={styles.Input}
                        type="text"
                        name="species"
                        placeholder="Character´s Species"
                        value={input.species}
                        onChange={(e) => handleChange(e)} 
                      />
                      <i className={styles.IconInput}></i> 
                    </div>

                  <div className={styles.SelectContainer}>
                    <span className={styles.Errors}>{errors.gender}</span>
                    <select value={input.gender} name="gender" onChange={(e)=> {handleChange(e)}}>
                      <option value="" disabled defaultValue hidden>Gender:</option>
                      <option value="Male"> Male</option>
                      <option value="Female">Female</option>
                      <option value="Genderless">Genderless</option>
                      <option value="unknown">unknown</option>
                    </select>
                    <span className={styles.Errors2}>{errors.status}</span>
                    <select value={input.status} name="status" onChange={(e)=> {handleChange(e)}}>
                      <option value="" disabled defaultValue hidden>Status:</option>
                      <option value="Alive"> Alive</option>
                      <option value="Dead">Dead</option>
                      <option value="unknown">unknown</option>
                    </select>


                  </div>

                  
                  <div className={styles.SelectContainer}>
                    <span className={styles.Errors}>{errors.origin}</span>
                    <select value={input.origin} name="origin" onChange={(e)=> {handleChange(e)}}>
                      <option value="" disabled defaultValue hidden>Character´s Origin:</option>
                      {locations && locations?.map((location, index) =>(
                        <option value={location.name} key={index}>{location.name}</option>
                      ))}
                    </select>


                  </div>

                  <div className={styles.SelectContainer}>
                    <span className={styles.Errors}>{errors.episodes}</span>
                    <select value={input.episodes.length === 0 ? "" : input.episodes[input.episodes.length-1]} name="episodes" onChange={(e)=> {handleSelect(e)}}>
                      <option value="" disabled defaultValue hidden>Character´s Episodes:</option>
                      {episodes && episodes?.map((episode, index) =>(
                        <option value={episode.name} key={index}>{episode.name}</option>
                      ))}
                    </select>

                  </div>

                  <div className={styles.EpisodesContainer}>
                      {input.episodes.length > 0 && input.episodes?.map((episode, index)=>(
                        <span className={styles.Episode} key={index}><img className={styles.IconEpisode} src={iconSplash} alt="icon-list-episodes" />{episode}</span>
                      )) }
                  </div>

                  <button className={styles.ButtonSubmit} type="submit">Create Character</button>

                  

                </form>
                <img className={styles.Waves} src={waves} alt="pattern-wave"/>
                <img className={styles.Characters} src={newcharacter} alt="pattern-wave"/>
              </div>
              
          </section>
      )}
      
    </>
  )
}

export default CreateCharacter;