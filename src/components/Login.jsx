import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api';
import styles from './Login.module.css'; 
import { CloseButton } from 'react-bootstrap'; // Import Bootstrap CloseButton
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(formData)
      .then((response) => setMessage(response.data.message))
      .catch((error) => setMessage(error.response.data.message));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email: formData.email, password: formData.password })
      .then((response) => {
        setMessage(response.data.message);
        localStorage.setItem('token', response.data.token); 
      })
      .catch((error) => setMessage(error.response.data.message));
  };
  
  const navigate = useNavigate(); // Use navigate to redirect to other pages
  const handleClose = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="close-container">
    <div className={styles.closeButtonContainer}>
      <CloseButton onClick={handleClose} aria-label="Close" />
    </div>
      <div className={styles.loginContainer}>
        {message && <p className={styles.message}>{message}</p>}
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={isSignUp ? handleRegister : handleLogin}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <button type="submit" className={styles.submitButton}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button onClick={() => setIsSignUp(!isSignUp)} className={styles.toggleButton}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;
