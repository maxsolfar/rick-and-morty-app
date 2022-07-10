import axios from "axios";

export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_CHARACTERS_NAME = "GET_CHARACTERS_NAME";
export const GET_EPISODES = "GET_EPISODES";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const GET_CHARACTER_DETAIL = "GET_CHARACTER_DETAIL";
export const POST_CHARACTERS = "POST_CHARACTERS";
export const DELETE_CHARACTER = "DELETE_CHARACTER";

export const RELOAD_CHARACTERS = "RELOAD_CHARACTERS";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const NUMBER_PAGES = "NUMBER_PAGES";
export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const CLEAN_SEARCH = "CLEAN_SEARCH";

function getAllCharacters() {
  return async function (dispatch) {
    try {
      const allCharacters = await axios.get("/characters");
      return dispatch({
        type: GET_CHARACTERS,
        payload: allCharacters.data,
      });
    } catch (error) {
      console.log(`getAllCharacters ${error}`);
    }
  };
}

function getCharactersByName(name){
  return async function (dispatch) {
    try {
      const charactersName = await axios.get(`/characters?name=${name}`);
      return dispatch({
        type: GET_CHARACTERS_NAME,
        payload: charactersName.data,
      });
      
    } catch (error) {
      console.log(`GetCharactersByName ${error}`);
    }
  };
}

function getCharacterDetail(id){
  return async function (dispatch) {
    if(id){
      try {
        const characterDetail = await axios.get(`/characters/${id}`);
        return dispatch({
          type: GET_CHARACTER_DETAIL,
          payload: characterDetail.data,
        });
      } catch (error) {
        console.log(`GetCharacterDetail ${error}`);
      }
    }
    else{
      dispatch({ type: GET_CHARACTER_DETAIL, payload: {} });
    }
    
  };
}

function getAllEpisodes() {
  return async function (dispatch) {
    try {
      const allEpisodes = await axios.get("/episodes");
      return dispatch({
        type: GET_EPISODES,
        payload: allEpisodes.data,
      });
    } catch (error) {
      console.log(`getAllEpisodes ${error}`);
    }
  };
}

function getAllLocations() {
  return async function (dispatch) {
    try {
      const allLocations = await axios.get("/locations");
      return dispatch({
        type: GET_LOCATIONS,
        payload: allLocations.data,
      });
    } catch (error) {
      console.log(`getAllLocations ${error}`);
    }
  };
}

function postCharacter(data) {
  return async function (dispatch) {
    try {
      const addCharacter = await axios.post("/characters", data);
      return dispatch({
        type: POST_CHARACTERS,
        payload: addCharacter,
      });
    } catch (error) {
      console.log(`POST CHARACTER ${error}`);
    }
  };
}

function deleteCharacter(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/characters/${id}`);
      return dispatch({
        type: DELETE_CHARACTER,
      });
    } catch (error) {
      console.log(`DeleteCharacter ${error}`);
    }
  };
}

function getPage(number){
  return {
    type: CURRENT_PAGE,
    payload: number,
  }
}

function nPages(number){
  return {
    type: NUMBER_PAGES,
    payload: number,
  }
}

function cleanSearch(){
  return {
    type: CLEAN_SEARCH,
    payload: null,
  }
}

function reloadCharacters(){
  return {
    type: RELOAD_CHARACTERS,
  }
}

function setNotification(type){
  return {
    type: SET_NOTIFICATION,
    payload: type,
  }
}

export {
  getAllCharacters,
  getCharactersByName,
  reloadCharacters,
  getCharacterDetail,
  getAllEpisodes,
  getAllLocations,
  postCharacter,
  getPage,
  nPages,
  deleteCharacter,
  setNotification,
  cleanSearch
};
