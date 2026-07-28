import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import './index.css'
import StarButton from '../StarButton'
import { capitalize } from '../../utils/capitalizeUtils'
import { Link } from 'react-router'
import { setFavorite } from '../../actions'
import Loading from '../Loading'

const Favorites = () => {
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const favorites = useSelector((state) => state.pokemons.favorites);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleOnFavorite = (id) => {
    dispatch(setFavorite(id))
  }

  useEffect(() => {
    if (pokemons.length > 0) {
      setLoading(false)
    }
  }, [pokemons])

  return (
    <div className='favorites-container'>
      {loading ? (
        <Loading />
      ) : (
        favorites.map((favorite) => {
          const pokemon = pokemons.find((pokemon) => pokemon.id === favorite);  
          return (
            <div key={favorite} className='favorite-card'>
              <StarButton isFavorite={favorites.includes(favorite)} onClick={() => handleOnFavorite(favorite)} />
              <Link to={`/pokemon/${pokemon.id}`} >
                <img src={pokemon.sprites.front_default } alt={pokemon.name} />
              </Link>
              <p>{capitalize(pokemon.name)}</p>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Favorites