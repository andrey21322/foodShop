import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Shop from './pages/Shop';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Coupons from "./pages/Coupons";
import Orders from "./pages/Orders";

import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      choosedShop: [],
      orders: [],
      coupons: [{name:"30%off", count: 30}, {name:"50%off", count: 50}],
      items: {
        kfc: [
          {
            'id': 1,
            'name': 'Чиззи чикен',
            'description': 'Нежные кусочки куриного мяса, обваленные в панировке, сыром и специями',
            'price': 5.99,
            'quantity': 1,
            'image': 'chizzy_chiken.jpg'
          },
          {
            'id': 2,
            'name': 'Фри',
            'description': 'Картофель фри, приготовленный по оригинальному рецепту KFC',
            'price': 2.99,
            'quantity': 1,
            'image': 'kfc_free.jpg'
          },
          {
            'id': 3,
            'name': 'Твистер',
            'description': 'Сочная курочка, свежие овощи и аппетитный соус в пшеничной лепешке',
            'price': 4.99,
            'quantity': 1,
            'image': 'kfc_twister.jpg'
          }
        ],
        mcdonalds: [
          {
            'id': 4,
            'name': 'Биг Мак',
            'description': 'Классический бургер с двумя рублеными бифштексами, салатом, сыром и специальным соусом',
            'price': 6.99,
            'quantity': 1,
            'image': 'BigMac.jpg'
          },
          {
            'id': 5,
            'name': 'Чизбургер',
            'description': 'Бургер с говяжьим рубленым бифштексом, сыром, луком и огурцом',
            'price': 3.49,
            'quantity': 1,
            'image': 'cheeseburger.jpg'
          },
          {
            'id': 6,
            'name': 'Картофель фри',
            'description': 'Сочные и хрустящие палочки из картофеля',
            'price': 2.49,
            'quantity': 1,
            'image': 'mcdfree.jpg'
          }
        ],
        somepizza: [
          {
            'id':7,
            'name': 'Маргарита',
            'description': 'Классическая пицца с томатным соусом, моцареллой и свежими томатами',
            'price': 8.99,
            'quantity': 1,
            'image': 'margarita.jpg'
          },
          {
            'id': 8,
            'name': 'Пепперони',
            'description': 'Пицца с пикантными колбасками пепперони, томатным соусом и сыром',
            'price': 9.99,
            'quantity': 1,
            'image': 'pepperoni.jpg'
          },
          {
            'id': 9,
            'name': 'Гавайская',
            'description': 'Пицца с ветчиной, ананасами, томатным соусом и сыром',
            'price': 7.99,
            'quantity': 1,
            'image': 'gavana.jpg'
          }
        ]
    },
      infoModal: null
    }
  }
  componentDidMount() {
    let cartMount = JSON.parse(localStorage.getItem("cart"))
    if(cartMount !== null) {
      this.setState({cart: cartMount})
    }
    let ordersMount = JSON.parse(localStorage.getItem("orders"))
    if(ordersMount !== null) {
      this.setState({orders: ordersMount})
    }
  }
  componentDidUpdate() {
    localStorage.setItem("cart", JSON.stringify(this.state.cart))
    localStorage.setItem("orders", JSON.stringify(this.state.orders))
  }

  deleteItemFromCart = (el) => {
    this.setState({cart: this.state.cart.filter(i => i.id !== el.id)})
    this.addTextToModal('Position deleted from cart')
  }

  handleChangeQntyInput = (el, e) => {
    this.state.cart.forEach(i => {
      if(i.id === el.id) {
        el.quantity = e.target.value
        this.setState({cart: [...this.state.cart]})
        if(i.quantity <= 0) {
          this.deleteItemFromCart(el)
        }
      }
    })
  }
  
  addTextToModal = (text) => {
    this.setState({infoModal: text})
    setTimeout(() => {
      this.setState({infoModal: null})
    }, 2000);
  }


  generateRandomNumberString() {
    let randomNumberString = ''
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 10)
      randomNumberString += randomNumber.toString()
    }
    return randomNumberString;
  }

  render() {
    if(this.state.choosedShop.length === 0) this.setState({choosedShop: this.state.items.kfc})
    let shops = Object.keys(this.state.items)
    const chooseShop = (i) => {
      this.setState({choosedShop: this.state.items[i]})
    }
    const addToCart = (element) => {
      if(this.state.cart.length === 0) {
        add(element)
      } else {
        if(this.state.choosedShop.find( item => item.id === this.state.cart[0].id)) {
          add(element)
          this.addTextToModal(`${element.name} added to cart`)
        } else {
          this.addTextToModal('U can add to cart only from one shop')
        }
      }
    }
    const addDataToOrders = (data) => {
      this.setState({orders: [...this.state.orders, data]})
    }
    const clearCart = () => {
      this.setState({cart: []})
    }
    const add = (element) => {
      let isInCart = false;
      this.state.cart.forEach(el => {
        if(el.id === element.id) {
          el.quantity++
          this.setState({cart: [...this.state.cart]})
          isInCart = true
        }
      })
  
      if(!isInCart){
        if(element.quantity !== 1 ){
          element.quantity = 1
        } 
        this.setState({cart: [...this.state.cart, element]})
      }
    }
  return (
    <>

      <Navbar />
      {this.state.infoModal === null ? "" : <div className="info-modal">
        {this.state.infoModal}
      </div> }
      <Routes>
        <Route path="/" element={
          <Shop 
            shops={shops} 
            addToCart={addToCart} 
            chooseShop={chooseShop} 
            choosedShop={this.state.choosedShop.length === 0 ? this.state.items.kfc : this.state.choosedShop}
          />
        }/>
        <Route path="/Cart" element={
          <Cart 
            cart={this.state.cart}
            handleChangeQntyInput={this.handleChangeQntyInput}
            deleteItemFromCart={this.deleteItemFromCart}
            generateRandomNumberString={this.generateRandomNumberString}
            coupons={this.state.coupons}
            addTextToModal={this.addTextToModal}
            addDataToOrders={addDataToOrders}
            clearCart={clearCart}
          />
        }/>
        <Route path="/Coupons" element={
          <Coupons coupons={this.state.coupons} addTextToModal={this.addTextToModal}/>
        }/>
        <Route path="/Orders" element={
          <Orders orders={this.state.orders}/>
        }/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
  };
};

export default App;
