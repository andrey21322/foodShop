import React from 'react';

import './pages.css'
import ShopComponent from '../components/shopComponent';

function Shop({ shops, chooseShop, addToCart, choosedShop }) {
  return (
    <div className='wrapper'>
      <div className='left-panel'>
        Shops:
        {shops.map(el => (
          <div key={el} onClick={() => chooseShop(el)}>{el.toUpperCase()}</div>
        ))}
      </div>
      <div className='right-panel'>
        <div className='item-wrapper'>
          <ShopComponent addToCart={addToCart} choosedShop={choosedShop}/>
        </div>
      </div>
    </div>
  );
};

export default Shop;
