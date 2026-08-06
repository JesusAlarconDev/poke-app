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

export const toggleFavorite = (pokemonId) => async (dispatch, getState) => {
  const token = getState().user.token;

  try {
    const response = await fetch('/api/users/favorites', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ favorite_id: Number(pokemonId) })
    });


    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Error al guardar favorito');
    }

    const data = await response.json();
  } catch (error) {
    console.error('Error al persistir favorito:', error);
  }
};

export const getFavorites = () => async (dispatch, getState) => {
  const token = getState().user.token;

  try {
    const response = await fetch('/api/users/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    dispatch(setFavorite(data.favorites));

  } catch (err) {
    console.error('Error al cargar favoritos', err);
  }

}

export const getPokemonswithDetails =
  (pokemons = []) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const pokemonsDetailed = await Promise.all(pokemons.map((pokemon) => getPokemonDetails(pokemon)));

    dispatch(setPokemons(pokemonsDetailed));
    dispatch(setLoading(false));
    return pokemonsDetailed;
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