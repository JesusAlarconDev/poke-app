import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import { Link } from 'react-router-dom'
import { generations } from '../../../statics/generations.js'
import { useAuth } from '../../../hooks/useAuth.js'
    
const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
        picture: ''
    });
    const {name, lastname, picture, email, password} = formData;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState('');
    const [selectedGeneration, setSelectedGeneration] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        console.log(formData);
        const REGISTER_URL = "/api/users/register";

        // TODO: create a function that validates the input of the forms
        const newErrors = {};
        if (!name) newErrors.name = 'El nombre es obligatorio';
        if (!email) newErrors.email = 'El email es obligatorio';
        if (!password) newErrors.password = 'La contraseña es obligatoria';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }
    
            const data = await response.json();
            const jwtToken = data.token; 
            const userInfo = data.user;
    
            if (jwtToken) {
                login(userInfo, jwtToken);
                navigate('/');
            } else {
                throw new Error('El servidor no retornó un token.');
            }
    
        } catch (error) {
            setErrors({ general: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerationSelect = (generation) => {
        setSelectedGeneration(generation);
        setFormData({ ...formData, picture: '' });
    };

    const handlePictureSelect = (pictureUrl) => {
        setFormData({ ...formData, picture: pictureUrl });
    };

    const handleBackToGenerations = () => {
        setSelectedGeneration(null);
        setFormData({ ...formData, picture: '' });
    };

  return (
    <form onSubmit={handleRegister} className="register-form">
        <div>
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="register-form-input"
            />
            {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="register-form-input"
            />
            {errors.password && <span className='error-message'>{errors.password}</span>}
        </div>
        <div>
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="register-form-input"
            />
            {errors.name && <span className='error-message'>{errors.name}</span>}
        </div>
        <div>
            <label htmlFor="lastname">Lastname</label>
            <input 
                type="text" 
                placeholder="Lastname"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                className="register-form-input"
            />
        </div>
        <div>
            <label htmlFor="picture">Select your avatar</label>
            
            {!selectedGeneration ? (
                <div className="generation-selector">
                    <p className="selector-label">Choose a generation:</p>
                    <div className="generation-grid">
                        {Object.entries(generations).map(([genNum, genData]) => (
                            <button
                                key={genNum}
                                type="button"
                                className="generation-option"
                                onClick={() => handleGenerationSelect(parseInt(genNum))}
                            >
                                Gen {genNum}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="starter-selector">
                    <div className="starter-header">
                        <button 
                            type="button" 
                            className="back-button"
                            onClick={handleBackToGenerations}
                        >
                            ← Back
                        </button>
                        <p className="selector-label">{generations[selectedGeneration].name} - Choose your starter:</p>
                    </div>
                    <div className="avatar-selector">
                        {generations[selectedGeneration].starters.map((starter) => (
                            <button
                                key={starter}
                                type="button"
                                className={`avatar-option ${formData.picture === starter ? 'selected' : ''}`}
                                onClick={() => handlePictureSelect(starter)}
                            >
                                <img src={starter} alt="Starter option" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            <input 
                type="hidden" 
                name="picture" 
                value={formData.picture}
            />
        </div>
        
      <button type="submit">
        {loading ? 'Loading...' : 'Register'}
      </button>

      {errors.general && <span className='error-message'>{errors.general}</span>}

      <Link to="/login" className='form-link'>You already have an Account?</Link>
    </form>
  )
}

export default Register