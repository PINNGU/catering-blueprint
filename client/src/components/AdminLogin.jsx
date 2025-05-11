import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const response = await axios.post('http://localhost:5000/api/admin/login', {
      username,
      password
    });

    if (response.status === 200 && response.data.token) {
      setSuccess('Login successful!');
      navigate('/menu')
    } else {
      setError(response.data.message || 'Invalid response from server.');
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);  // Show server-sent error message
    } else {
      setError('Server error or connection problem.');
    }
  }
};

  return (
    <div className="login-background">
        <div className='login-overlay'></div>
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Login</button>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    </div>
  
  );
};

export default AdminLogin;
