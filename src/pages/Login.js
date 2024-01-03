import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
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
      const response = await fetch('http://localhost:5000/users/LoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      console.log('Server Response:', response);

      const jsonResponse = await response.json();
      console.log('JSON Response:', jsonResponse);

      if (response.ok) {
        localStorage.setItem('userEmail', credentials.email);
        console.log(localStorage.getItem('userEmail'));

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
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Login</h2>
              <p className='text-white-50 mb-5'>Please enter your login and password!</p>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size='lg'
                  name='email'
                  value={credentials.email}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size='lg'
                  name='password'
                  value={credentials.password}
                  onChange={handleChange}
                />

                <p className='small mb-3 pb-lg-2'>
                  <a className='text-white-50' href='#!'>
                    Forgot password?
                  </a>
                </p>
                <MDBBtn outline className='mx-2 px-5' color='white' size='lg' type='submit'>
                  Login
                </MDBBtn>
              </form>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size='lg' />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size='lg' />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size='lg' />
                </MDBBtn>
              </div>

              <div>
                <p className='mb-0'>
                  Don't have an account? <Link to='/signup' className='text-white-50 fw-bold'>Sign Up</Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
