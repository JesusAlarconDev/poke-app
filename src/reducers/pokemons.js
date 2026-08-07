import { SET_FAVORITE, SET_LOADING, SET_POKEMONS, LOGOUT } from "../actions/types";

const initialState = {
  pokemons: [],
  loading: false,
  favorites: []
};

export const pokemonsReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      }
    case SET_FAVORITE:
      return {
        ...state,
        favorites: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        favorites: []
      }
    default:
      return state;
  }
}