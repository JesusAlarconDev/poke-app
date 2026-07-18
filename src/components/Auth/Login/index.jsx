import { useState } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'


const Login = () => {
  const [formData, setFormData] = useState ({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const LOGIN_URL = '/api/users/login'; 

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    email: email,
                    password: password,
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
                loginWithToken(jwtToken, userInfo);
                navigate('/');
            } else {
                throw new Error('El servidor no retornó un token.');
            }
    
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
      <form onSubmi={handleLogin} className="register-form">
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
                
        <button type="submit">Register</button>

        <Link to="/register" className='form-link'>You don't have an account yet? Sign up Here</Link>
      </ form>
  )
}

export default Login