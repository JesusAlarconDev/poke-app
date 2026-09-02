import axios from "axios"

export const getPokemon = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025')
  .then(res => res.data.results)
  .catch(error => console.log(error));
}

export const getPokemonDetails = (pokemon) => {
  return axios.get(pokemon.url)
  .then(res => {
    const pokemonData = res.data;
    const speciesUrl = pokemonData.species.url;

    return axios.get(speciesUrl).then(res => {
      const speciesData = res.data;

    return {
      ...pokemonData,
      generation: speciesData.generation.name
    }

    });
  })
  .catch(error => console.log(error));
}

export const getPokemonswithDetailsBatch = async (pokemons = [], batchSize = 30) => {
  const results = [];
  for (let i = 0; i < pokemons.length; i += batchSize) {
    const batch = pokemons.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(pokemon => getPokemonDetails(pokemon)));
    results.push(...batchResults);
  }
  return results;
}