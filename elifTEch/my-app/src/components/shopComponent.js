function ShopComponent({ addToCart, choosedShop }) {
  return (
    <>
    {choosedShop.map(el => (
        <div className='item' key={el.id}>
            <img src={"../img/" + el.image} alt={el.name} />
            <div>{el.name} {el.price}$</div>
            <button onClick={() => addToCart(el)}> Add to Cart </button>
        </div>
    ))}
    </>
  );
};

export default ShopComponent;
