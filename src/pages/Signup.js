import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, MapPin } from 'lucide-react';

function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

    setError('');

  };

  const handleSubmit = async (event) => {
    console.log(credentials.geolocation);
    event.preventDefault();
    setError('');

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

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '1.5rem'
    },
    icon: {
      width: '48px',
      height: '48px',
      color: '#3b82f6',
      margin: '0 auto 0.5rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    errorMessage: {
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      padding: '0.75rem',
      borderRadius: '6px',
      fontSize: '0.875rem',
      marginBottom: '1rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    inputGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.25rem'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      width: '20px',
      height: '20px'
    },
    input: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    submitButton: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.625rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    loginText: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#4b5563'
    },
    loginLink: {
      color: '#3b82f6',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      marginLeft: '0.25rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <UserPlus style={styles.icon} />
          <h2 style={styles.title}>Create Account</h2>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <div style={styles.inputWrapper}>
              <User style={styles.inputIcon} />
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <Mail style={styles.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock style={styles.inputIcon} />
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="geolocation" style={styles.label}>Address</label>
            <div style={styles.inputWrapper}>
              <MapPin style={styles.inputIcon} />
              <input
                type="text"
                id="geolocation"
                name="geolocation"
                value={credentials.geolocation}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your address"
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            <UserPlus size={20} />
            Sign Up
          </button>
        </form>

        <div style={styles.loginText}>
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            style={styles.loginLink}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;