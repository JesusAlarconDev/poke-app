import './App.css'
import {Col, Spin} from 'antd'
import Searcher from './components/Searcher'
import PokemonList from './components/PokemonList'
import { useEffect, useState } from 'react'
import { getPokemon } from './api'
import { getPokemonswithDetails, setLoading } from './actions'
import { useDispatch, useSelector } from 'react-redux'
import iconoPokeApp from './assets/icono-poke-app.png'
import { Routes, Route, Link } from 'react-router-dom'
import PokemonDetail from './components/PokemonDetail'

function App() {
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async() => {
      dispatch(setLoading(true));
      const pokemonRes = await getPokemon();
      dispatch(getPokemonswithDetails(pokemonRes));
      dispatch(setLoading(false));
    }
    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      <Col span={8} offset={8}>
        <h2>PokeApp</h2>
        
        <Link to="/">
          <img src={iconoPokeApp} alt="Logo" className='logo' />
        </Link>
      </Col>
    <Routes>
      <Route path="/" element={
        <div>
          <Col span={8} offset={8}>
            <Searcher search={search} setSearch={setSearch} className='searcher' />
          </Col>
          {loading ? (<Col offset={12}>
            <Spin spinning size='large'/>
          </Col> ) : (
          <Col span={21}>
            <PokemonList pokemons={pokemons} search={search} />
          </Col>
          )}
        </div>
      } />

      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
    
    <footer>
      <p>Made with ❤️ by <a href="https://github.com/jesusalarcondev" target="_blank" rel="noopener noreferrer">Jesús Alarcón</a></p>
    </footer>
    </div>
  )
}

export default App;
