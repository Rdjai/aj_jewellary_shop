import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://jewellaryappbackend-1.onrender.com/users/LoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', jsonResponse.authToken);

        navigate('/');
      } else {
        console.error('Error Login:', jsonResponse.error);
        alert('Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container p-4 rounded shadow" style={{ width: '300px', background: 'linear-gradient(45deg, #3498db, #8e44ad)' }}>
        <h2 className="text-center mb-4 text-white">Login</h2>

        {/* Email input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        {/* Password input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleSubmit}
        >
          Sign in
        </button>

        {/* Register link */}
        <p className="text-center mt-3">
          Not a member?{' '}
          <Link to="/signup" className="btn-link text-white">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
