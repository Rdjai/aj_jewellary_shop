import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './pages/Signup.js';
import { CartProvider } from './components/contextReducer.js';
import MyOrder from './pages/MyOrderes.js';
// import Cart from './pages/Cart.js';


function App() {
  return (
    <CartProvider>
        <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/myOrderes' element={<MyOrder/>} />
          {/* <Route path='/signup' element={<Cart />} /> */}
        </Routes>
      </Router>
    </div>
    </CartProvider>
  
  );
}

export default App;
