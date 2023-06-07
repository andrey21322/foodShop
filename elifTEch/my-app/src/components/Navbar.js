import React from 'react';
import { Link } from 'react-router-dom';
import './components.css'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='links'>
            <Link to="/" className='link'>Shop</Link>
            <Link to="/cart" className='link'>Cart</Link>
            <Link to="/coupons" className='link'>Coupons</Link>
            <Link to="/orders" className='link'>Orders</Link>
        </div>
    </div>
  );
};

export default Navbar;
