import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Memoized total amount calculation
  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + (parseFloat(item.cost.replace(/\D/g, "")) || 0) * item.quantity, 0).toFixed(2);
  }, [cart]);

  const handleIncrement = useCallback((item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  }, [dispatch]);

  const handleDecrement = useCallback((item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  }, [dispatch]);

  const handleRemove = useCallback((item) => {
    dispatch(removeItem(item.name));
  }, [dispatch]);

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented soon!');
  };

  // Conditional rendering when cart is empty
  if (cart.length === 0) {
    return <h2 className="empty-cart-message">Your cart is empty!</h2>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-total-amount">Total Cart Amount: ${totalAmount}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.id || item.name}>
            <img 
              className="cart-item-image" 
              src={item.image || '/default-placeholder.png'} 
              alt={item.name || 'Product Image'} 
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost.replace(/\D/g, "")}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">
                Total: ${(item.cost.replace(/\D/g, ""))*item.quantity}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
