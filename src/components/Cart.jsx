import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {decreaseCart, removeFromCart, addToCart, clearCart, getTotals } from "../features/cartSlice";
import {  ArrowBackIos }from '@material-ui/icons';
import { useEffect } from "react";
import PayButton from "./PayButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
     dispatch(getTotals())
  }, [cart, dispatch])

  function handleRemoveFromCart(cartItem) {
    dispatch(removeFromCart(cartItem));
  }
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem))
  }
  const handleIncreaseQuantity = (cartItem) => {
    dispatch(addToCart(cartItem))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      { cart.cartItems.length === 0
       ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to = '/'>
              < ArrowBackIos />
              <span>Start Shopping</span>
            </Link>
        
          </div>
        </div>
       ) 
      : (
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
          {cart.cartItems?.map(cartItem => (
            <div className="cart-item" key = {cartItem._id}>
              <div className="cart-product">
                <img src= {cartItem.image?.url} alt={cartItem.name} />
                <div>
                  <h3>{cartItem.name}</h3>
                  <p>{cartItem.desc}</p>
                  <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                </div>
              </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleIncreaseQuantity(cartItem)}>+</button>
                </div>
              <div className="cart-product-total-price">
                {cartItem.price * cartItem.cartQuantity}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <button className="clear-cart" onClick={() => handleClearCart() }>Clear Cart</button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">${cart.cartTotalAmount}</span>
            </div>
            <p>Taxes and shipping are calculated at checkout</p>
            {
              auth._id ? (
                <PayButton cartItems = {cart.cartItems} />
              ) : (
                <button 
                className="cart-login"
                onClick={() => navigate("/login")}
                >
                  Login to Check out
                </button>
              )
            }
            <div className="continue-shopping">
            <Link to = '/'>
              < ArrowBackIos />
              <span>Continue Shopping</span>
            </Link>
        
          </div>
          </div>
        </div>
      </div>
      ) }
    </div>
  )
}

export default Cart