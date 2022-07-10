import {
  GET_CHARACTERS,
  GET_CHARACTERS_NAME,
  GET_CHARACTER_DETAIL,
  POST_CHARACTERS,
  DELETE_CHARACTER,
  GET_EPISODES,
  GET_LOCATIONS,
  CURRENT_PAGE,
  NUMBER_PAGES,
  RELOAD_CHARACTERS,
  SET_NOTIFICATION,
  CLEAN_SEARCH
} from "./actions";

const initialState = {
  allCharacters: [],
  characters: [],
  episodes: [],
  locations: [],
  characterDetail: {},
  savedPage: 1,
  numberPages: 6,
  notification: "",
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CHARACTERS:
      return {
        ...state,
        allCharacters: payload,
        characters: payload,
      };

    case GET_CHARACTERS_NAME:
      return {
        ...state,
        characters: payload,
      };

    case GET_CHARACTER_DETAIL:
      return {
        ...state,
        characterDetail: payload,
      };

    case GET_EPISODES:
      return {
        ...state,
        episodes: payload,
      };

    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
      };

    case POST_CHARACTERS:
      return {
        ...state,
      };

    case DELETE_CHARACTER:
      return {
        ...state,
      };

    case CURRENT_PAGE:
      return {
        ...state,
        savedPage: payload,
      };

    case NUMBER_PAGES:
      return {
        ...state,
        numberPages: payload,
      }

    case RELOAD_CHARACTERS:
      return {
        ...state,
        characters: state.allCharacters,
      };

    case SET_NOTIFICATION:
      return {
        ...state,
        notification: payload,
      };
      
    case CLEAN_SEARCH:
      return {
        ...state,
        characters: []
      }

    default:
      return state;
  }
}
