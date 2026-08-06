import './App.css'
import {Col, Spin} from 'antd'
import Searcher from './components/Searcher'
import PokemonList from './components/PokemonList'
import { useEffect, useState } from 'react'
import { getPokemon } from './api'
import { getPokemonswithDetails, setLoading, getFavorites } from './actions'
import { useDispatch, useSelector } from 'react-redux'
import iconoPokeApp from './assets/icono-poke-app.png'
import { Routes, Route, Link } from 'react-router-dom'
import PokemonDetail from './components/PokemonDetail'
import NotFound from './components/NotFound'
import Favorites from './components/Favorites'
import UserMenu from './components/UserMenu'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './hooks/useAuth'

function App() {
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const loading = useSelector((state) => state.pokemons.loading);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPokemons = async() => {
      dispatch(setLoading(true));
      const pokemonRes = await getPokemon();
      dispatch(getPokemonswithDetails(pokemonRes));
      dispatch(setLoading(false));
    }
    fetchPokemons();

    if (isAuthenticated) {
      dispatch(getFavorites());
    }
  }, []);

  return (
    <div className='App'>
      <Col xs={24} sm={24} md={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }} xl={{ span: 8, offset: 8 }} xxl={{ span: 8, offset: 8 }} style={{ textAlign: 'center' }}>
        <h2>PokeApp</h2>   
        <Link to="/">
          <img src={iconoPokeApp} alt="Logo" className='logo' />
        </Link>
      </Col>
      <UserMenu />
      <Routes>
        <Route path="/" element={<PokemonList pokemons={pokemons} loading={loading} />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer>
        <p>Made with ❤️ by <a href="https://github.com/jesusalarcondev" target="_blank" rel="noopener noreferrer">Jesús Alarcón</a></p>
      </footer>
    </div>
  )
}

export default App;
