import React, { useState, useMemo } from 'react';
import './pages.css'
import CartComponent from '../components/cartComponent';
//import GoogleMapComponent from '../components/googleMapsComponent';

function Cart({ cart, handleChangeQntyInput, deleteItemFromCart, generateRandomNumberString, coupons, addTextToModal, addDataToOrders, clearCart}) {
  
  const [inputValue, setInputValue] = useState('')
  const [couponeValue, setCouponeValue] = useState('')
  const [dataToSend, setDataToSend] = useState({
    name: '',
    email: '',
    phone: '',
    adress: ''
  })
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  let total = 0
  let CAPTCHA = useMemo(() => generateRandomNumberString(), [])
  cart.forEach(el => total += Number.parseFloat(el.price * el.quantity))
  let activeCoupone = coupons.find(i => i.name === couponeValue)
  
  if(activeCoupone) {
    total = total - Math.floor(total * activeCoupone.count) / 100
  }
  total = Math.floor(total * 100) / 100

  const handleChange = (e) => {
    setDataToSend({
      [e.target.name]: e.target.value
    })
  } 

  const submitCart = () => {
    if(Number(CAPTCHA) === Number(inputValue)) {
      const data = {
        name: dataToSend.name,
        email: dataToSend.email,
        phone: dataToSend.phone,
        adress: dataToSend.adress,
        cart,
        totalCost: total,
        id: Date.now()
      }
      if(cart.length !== 0 && dataToSend.name !== '' && dataToSend.email !== '' && dataToSend.phone !== '' && dataToSend.adress !== '') {
        fetch('http://localhost:3001/sendData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
          addTextToModal(result);
        })
        .then(res => addDataToOrders(data))
        .then(res => setDataToSend({
          name: '',
          email: '',
          phone: '',
          adress: ''
        }))
        .then(res => (setCouponeValue(''), setInputValue('')))
        .then(res => clearCart())
        .catch(error => {
          console.error(error);
          addTextToModal("smth going wrong")
        })
      } else {
        addTextToModal("uncorrect data for submit")
        } 
      } else {
        addTextToModal("uncorrect captcha")
      }
      
    }

  return (
    <>
    <div className='cart-wrapper'>
      <div className='left-panel'>
        <div>Name:</div>
        <input value={dataToSend.name} onChange={e => handleChange(e)} name="name" placeholder='Name'/>
        <div>Email:</div>
        <input value={dataToSend.email} onChange={e => handleChange(e)} name="email" placeholder='Email'/>
        <div>Phone:</div>
        <input value={dataToSend.phone} onChange={e => handleChange(e)} name="phone" placeholder='Phone'/>
        <div>Adress:</div>
        <input value={dataToSend.adress} onChange={e => handleChange(e)} name="adress" placeholder='Adress'/>
        {/* <GoogleMapComponent /> */}
      </div>
      <div className='right-panel'>
        <CartComponent cart={cart} handleChangeQntyInput={handleChangeQntyInput} deleteItemFromCart={deleteItemFromCart}/>
      </div>
    </div>
    <div className='bottom-panel'>
      <div>
        CAPTCHA: 
         <span className='captcha'>{CAPTCHA}</span>
        <input value={inputValue} onChange={handleInputChange} />
      </div>
      <div>
        Total Price:<span> {total} $</span> 
        <input placeholder='coupone' value={couponeValue} onChange={e => setCouponeValue(e.target.value)}/>
      </div>
        <button onClick={() => submitCart()}>Submit</button>
    </div>
    </>
  );
};

export default Cart;
