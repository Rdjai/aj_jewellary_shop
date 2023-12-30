import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Badge from 'react-bootstrap/Badge';
import Modal from '../Model';
import Cart from '../pages/Cart';
import { useCart } from '../components/contextReducer';

export default function Navbar() {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const cartItemCount = data.length;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '28px' }}>Aaryan Jewells</span>
          
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/" style={{ fontSize: '16px', fontWeight: 'bold' }}>Home</Link>
              </li>
              {localStorage.getItem('authToken') ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrderes" style={{ fontSize: '16px', fontWeight: 'bold' }}>My Orders</Link>
                </li>
              ) : null}
            </ul>

            {!localStorage.getItem('authToken') ? (
              <div className="d-flex ms-auto">
                <Link className="btn btn-primary ms-2" to="/login">Login</Link>
                <Link className="btn btn-primary ms-2" to="/signup">Signup</Link>
              </div>
            ) : (
              <div className="d-flex ms-auto">
               <div className='btn bg-white text-success mx-2' onClick={() => setCartView(true)}>
  {/* My Cart{" "} */}
  <i className="fas fa-shopping-cart" style={{ color: 'green', fontSize: '1.5rem ', marginRight:'3px '}}>{cartItemCount}</i>
</div>


                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                <div className="btn btn-outline-danger ms-2" onClick={handleLogout} style={{ backgroundColor: 'white', color: 'red', border: '1px solid red' }}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
