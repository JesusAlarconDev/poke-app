import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">   
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <div className="ditto-container">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png" 
            alt="Ditto" 
            className="ditto-image"
          />
        </div>

        <p className="error-message">
          Oops!! It's a Ditto. The page you're looking for doesn't exist
        </p>
        
        <div className="error-actions">
          <Link to="/">
            <Button 
              type="primary" 
              size="large" 
              icon={<HomeOutlined />}
              className="home-button"
            >
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
