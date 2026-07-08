import { SET_FAVORITE, SET_LOADING, SET_POKEMONS } from "../actions/types";

const favoritesFromLS = JSON.parse(localStorage.getItem('favorites')) || [];

const initialState = {
  pokemons: [],
  loading: false,
  favorites: favoritesFromLS
};

export const pokemonsReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_POKEMONS:
      return {
        ...state, 
        pokemons: action.payload
      }
    case SET_FAVORITE:
      let newState = {};
      if(state.favorites.includes(action.payload)) {
        newState = {
          ...state,
          favorites: state.favorites.filter((favorite) => favorite !== action.payload).sort((a,b) => a - b)
        };
      } else {
        newState = {
          ...state,
          favorites: [...state.favorites, action.payload].sort((a,b) => a - b)
        };
      }

      localStorage.setItem('favorites', JSON.stringify(newState.favorites));
      return newState;
    case SET_LOADING:
      return {
        ...state, 
        loading: action.payload
      }
    default: 
      return state;
  }
}