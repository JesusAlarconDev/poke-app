import { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { generations } from '../statics/generations.js'
    
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        picture: '',
        email: '',
        password: ''
    });
    const [selectedGeneration, setSelectedGeneration] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(formData);
        const REGISTER_URL = "/api/users/register";
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
        
      <button type="submit">Register</button>

      <Link to="/login" className='form-link'>You already have an Account?</Link>
    </form>
  )
}

export default Register