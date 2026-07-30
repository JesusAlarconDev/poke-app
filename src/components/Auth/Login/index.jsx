import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.js'


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState ({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const LOGIN_URL = '/api/users/login';

        const newErrors = {};
        if (!formData.email) newErrors.email = 'El email es obligatorio';
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        } 

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    email: formData.email,
                    password: formData.password,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el inicio de sesión');
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
    }

  return (
      <form onSubmit={handleLogin} className="register-form">
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
                
        <button type="submit">
            {loading ? 'Loading...' : 'Login'}
        </button>

        {errors.general && <span className='error-message'>{errors.general}</span>}

        <Link to="/register" className='form-link'>You don't have an account yet? Sign up Here</Link>
      </ form>
  )
}

export default Login