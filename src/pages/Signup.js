import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Signup () {
  const [credentials, setCredentials] = useState ({
    name:'',
    email:'',
    password:'',
    geolocation:'',
  });

  const handleChange =(event)=> {
    // const {name, value} = e.target;
    setCredentials ({...credentials,[event.target.name]:event.target.value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/users/CreateUser', {
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
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
          <label htmlFor="email" className="form-label">
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
          <label htmlFor="password" className="form-label">
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
          <label htmlFor="address" className="form-label">
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/login">Already have an account? Login here.</Link>
    </div>
  );
}
