import {Card} from 'antd';
import './index.css';
import Meta from 'antd/es/card/Meta';
import StarButton from '../StarButton';
import { useDispatch } from 'react-redux';
import { toggleFavorite, getFavorites } from '../../actions';
import { Link } from 'react-router-dom';
import { generationName } from '../../utils/generationName';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({name, image, isFavorite, types, id, generation}) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const typesInline  = (types) => {
    let result = "";
    types.map((type, index, array) => {
      if(index === array.length - 1){
        result += type.type.name + ".";
      } else {
        result += type.type.name + ", ";
      }
    });

    return result;
  }

  const handleOnFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavorite(id));
    dispatch(getFavorites());
  }

  return (
    <Card
      title={
        <Link to={`/pokemon/${id}`} style={{ color: 'inherit' }}>
          {"#" + id + " " + name}
        </Link>
      }
      cover={
        <Link to={`/pokemon/${id}`}>
          <img src={image} alt={name} style={{ height: '300px', objectFit: 'cover' }} />
        </Link>
      }
      extra={<StarButton isFavorite={isFavorite} onClick={handleOnFavorite} />}
      styles={{cover: {height: '300px', padding: '15px'}}}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
        <span className={`generation ${generation}`} >{generationName(generation)} </span>
        <Meta 
          description={typesInline(types)}
          style={{ margin: 0 }}
        />
      </div>
    </Card>
  )
}

export default PokemonCard