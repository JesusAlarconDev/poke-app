import axios from "axios";
import "./index.css"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { generationName } from "../../utils/generationName"
import pokedexImage from "../../assets/pokedex.png"
import { SoundFilled } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../actions';
import Loading from '../Loading';
import { capitalize } from '../../utils/capitalizeUtils';
import { getEnglishFlavorText, getEnglishGenus } from '../../utils/flavorTextUtils';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import NotFound from "../NotFound";

const PokemonDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [pokemon, setPokemon] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [activeTab, setActiveTab] = useState('official');
  const loading = useSelector((state) => state.pokemons.loading);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // The API returns two different endpoints for the same pokemon, so we need to combine them
  // for obtain all the data of the pokemon
  useEffect(() => {
    setError(null);
    dispatch(setLoading(true));
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(res => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then (res2 => {
            const combinedData = {
                ...res.data,
                ...res2.data
            };
            setPokemon(combinedData);
            dispatch(setLoading(false));
        })
    })
    .catch(error => setError(error))
  }, [id]);

  const pokedexSpeak = (text) => {
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance(text);

    // Usar la voz seleccionada si está disponible
    if (selectedVoice) {
      message.voice = selectedVoice;
      message.lang = selectedVoice.lang;
    } else {
      message.lang = 'en-US';
    }
    
    message.rate = 1.1;
    message.pitch = 1.3;
    message.volume = 1;
    
    window.speechSynthesis.speak(message);
  }

  useEffect(() => {
    if (pokemon) {
      const englishDescription = getEnglishFlavorText(pokemon.flavor_text_entries);
      const englishGenus = getEnglishGenus(pokemon.genera);
      // Example: Bulbasaur. Seed pokemon. Description ...
      pokedexSpeak(pokemon.name + ". " + englishGenus + ". " + englishDescription);
    }

    return () => {
      window.speechSynthesis.cancel();
    }
  }, [pokemon]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="pokemon-detail-container">
        {error && (<NotFound />)}

        {pokemon ? (
          <div className="pokedex-container">
            <div className="back-button-container">
              <Button 
                type="primary" 
                icon={<ArrowLeftOutlined />} 
                onClick={handleGoBack}
                className="back-button"
              >
                Back
              </Button>
            </div>
            <img src={pokedexImage} alt="Pokedex" className="pokedex-image" />
            <div className="detail-container">
              <h1>Pokemon #{id} - {capitalize(pokemon.name)}</h1>
              <span>{getEnglishGenus(pokemon.genera)}</span>
              <p className={`generation ${pokemon.generation?.name}`}>{generationName(pokemon.generation?.name)}</p>

              <div className="container-main">
                <div className="sprite-tabs-container">
                  <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    size="small"
                    tabBarStyle={{ borderBottom: 'none' }}
                    indicator={null}
                    items={[
                      {
                        key: 'official',
                        label: 'Oficial',
                        children: (
                          <div className="sprite-container">
                            <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                          </div>
                        )
                      },
                      {
                        key: 'shiny',
                        label: 'Shiny',
                        children: (
                          <div className="sprite-container">
                            <img src={pokemon.sprites.other["official-artwork"].front_shiny} alt={pokemon.name} />
                          </div>
                        )
                      },
                      {
                        key: 'sprite',
                        label: 'Sprite',
                        children: (
                          <div className="sprite-container">
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                          </div>
                        )
                      },
                      {
                        key: 'home',
                        label: 'Home',
                        children: (
                          <div className="sprite-container">
                            <img src={pokemon.sprites.other["home"].front_default} alt={pokemon.name} />
                          </div>
                        )
                      }
                    ]}
                  />
                </div>

                <div className="pokemon-details-grid">
                  <div className="detail-box description">
                    <p className="detail-label">Description</p>
                    <p className="detail-value">{getEnglishFlavorText(pokemon.flavor_text_entries)}
                      <SoundFilled 
                        onClick={() => pokedexSpeak(getEnglishFlavorText(pokemon.flavor_text_entries))} 
                        style={{ color: '#EEFCEA', cursor: 'pointer' }}
                      />
                    </p>
                  </div>
                  <div className="detail-box">
                    <p className="detail-label">Height</p>
                    <p className="detail-value">{pokemon.height}</p>
                  </div>
                  <div className="detail-box">
                    <p className="detail-label">Weight </p>
                    <p className="detail-value">{pokemon.weight}</p>
                  </div>
                  <div className="detail-box">
                    <p className="detail-label">Types</p>
                    <p className="detail-value">{pokemon.types.map(type => type.type.name).join(', ')}</p>
                  </div>
                  <div className="detail-box">
                    <p className="detail-label">Habitat</p>
                    <p className="detail-value">{pokemon.habitat?.name || 'Unknown'}</p>
                  </div>
                  {pokemon.is_legendary && (
                    <p className="legendary">Legendary</p>
                  )}
                  {pokemon.is_mythical && (
                    <p className="mythical">Mythical</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          loading && (<Loading />)
        )}
    </div>
  )
}

export default PokemonDetail