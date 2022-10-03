import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import './checkout-item.styles.scss'
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)
  const clearItemFromCartHandler = () => {
    clearItemFromCart(cartItem)
  }
  const incrementHndler = () => {
    addItemToCart(cartItem)
  }
  const decrementHndler = () => {
    removeItemFromCart(cartItem)
  }
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className='arrow' onClick={decrementHndler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={incrementHndler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemFromCartHandler}>&#10005;</span>
    </div>
  )
}

export default CheckoutItem