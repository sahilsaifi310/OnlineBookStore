import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ cart, removeFromCart, incrementQuantity, decrementQuantity, setCart }) => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrder = () => {
    toast.success(
      `Order placed successfully!\nPayment Method: ${paymentMethod}\nTotal: ₹${totalPrice}`,
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );

    setCart([]);

   
    setTimeout(() => {
      navigate("/");
    }, 2000); 
  };

  return (
    <div className="cart-container">
      <ToastContainer />

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((book) => (
            <div className="cart-item" key={book.id}>
              <img src={book.image} alt={book.title} className="cart-item-image" />
              <h2>{book.title}</h2>
              <p><b>Quantity:</b> {book.quantity}</p>
              <p><b>Total:</b> ₹{book.quantity * book.price}</p>

              <div className="quantity-buttons">
                <button onClick={() => decrementQuantity(book.id)}>-</button>
                <span>{book.quantity}</span>
                <button onClick={() => incrementQuantity(book.id)}>+</button>
              </div>

              <button className="remove-button" onClick={() => removeFromCart(book.id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="payment-section">
            <h2>Payment Method</h2>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
            </select>

            <h3>Total Amount: ₹{totalPrice.toFixed(2)}</h3>
            <button onClick={handleOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
