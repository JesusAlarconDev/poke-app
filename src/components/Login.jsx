import { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'


const Login = () => {
  const [formData, setFormData] = useState ({
    email: '',
    password: ''
  });

    const handleLogin = async (e) => {
        e.preventDefault();
       
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