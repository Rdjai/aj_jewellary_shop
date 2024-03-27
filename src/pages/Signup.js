import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });
 
  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://jewellaryappbackend-1.onrender.com/users/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          Address: credentials.geolocation,
        }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        console.log('User registered successfully!');
        navigate('/login');
        // Optionally, you can redirect the user to a login page or another route.
      } else {
        console.error('Error registering user:', jsonResponse.error);
        alert('Error registering user. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container p-4 rounded shadow" style={{ width: '400px', background: 'linear-gradient(45deg, #3498db, #8e44ad)' }}>
        <h2 className="text-center mb-4 text-white">Sign Up</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label text-white">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label text-white">
            Address
          </label>
          <input
            type="geolocation"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>
          Submit
        </button>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="btn-link text-white">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
