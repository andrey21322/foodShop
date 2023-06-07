function CartComponent({ cart, handleChangeQntyInput, deleteItemFromCart}) {
  return (
    <>
    {cart.length === 0 || cart === null ? 'Корзина пуста' : cart.map(el => (
        <div className='cart-item' key={el.name}>
        <img src={"../img/" + el.image} alt={el.name}/>
        <div class="some-item">
            <div> {el.name} </div>
            <div> {el.price} $</div>
            <div> <input onChange={event => handleChangeQntyInput(el, event)} placeholder='0' type="number" value={el.quantity}/></div>
            <button onClick={() => deleteItemFromCart(el)}> DELETE </button>
        </div>
        </div>
    ))}
    </>
  );
};

export default CartComponent;
