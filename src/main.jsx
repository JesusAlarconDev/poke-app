import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { pokemonsReducer } from './reducers/pokemons.js';
import { userReducer } from './reducers/user.js';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { logger } from './middlewares/index.js';
import { thunk } from 'redux-thunk';
import { BrowserRouter } from 'react-router';

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeAlt(
  applyMiddleware(logger, thunk)
)

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  user: userReducer
})

const store = createStore(
  rootReducer,
  composedEnhancers
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
