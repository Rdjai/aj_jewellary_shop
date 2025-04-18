import React from 'react';
// import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './pages/Signup.js';
import { CartProvider } from './components/contextReducer.js';
import MyOrder from './pages/MyOrderes.js';
import Cart from './pages/Cart.js';


function App() {
  return (
    <CartProvider>

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/myOrderes' element={<MyOrder />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>

    </CartProvider>

  );
}

export default App;
