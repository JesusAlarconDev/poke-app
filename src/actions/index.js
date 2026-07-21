import { getPokemonDetails } from "../api";
import { SET_FAVORITE, SET_LOADING, SET_POKEMONS, SET_USER, SET_TOKEN, LOGOUT } from "./types"

export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload
});

export const setFavorite = (payload) => ({
  type: SET_FAVORITE,
  payload
});

export const getPokemonswithDetails = 
  (pokemons = []) => 
  async (dispatch) => {
    const pokemonsDetailed = await Promise.all(pokemons.map((pokemon) => getPokemonDetails(pokemon)));
    
    dispatch(setPokemons(pokemonsDetailed)); 
  }

export const setUser = (payload) => ({
  type: SET_USER,
  payload
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload
});

export const logout = () => ({
  type: LOGOUT
});