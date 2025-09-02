// src/components/Cart/ConfirmOrder.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../features/orderAction";
import "./ConfirmOrder.css";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const shippingInfo = JSON.parse(sessionStorage.getItem("shippingInfo"));

  const proceedToPayment = () => {
    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      totalPrice,
      paymentInfo: { status: "Pending" }, // default before payment
    };

    dispatch(createOrder(orderData))
      .unwrap()
      .then((res) => {
        // save order info for payment page
        sessionStorage.setItem(
          "orderInfo",
          JSON.stringify({
            totalPrice,
            orderId: res.order._id, // backend should return { order }
          })
        );
        navigate("/process/payment");
      })
      .catch((err) => {
        console.error("Order creation failed:", err);
        alert("Failed to create order. Try again.");
      });
  };

  return (
    <div className="confirmOrderContainer">
      <h2>Confirm Your Order</h2>

      <div className="shippingInfo">
        <h3>Shipping Info</h3>
        <p>
          {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
          {shippingInfo.country} - {shippingInfo.pinCode}
        </p>
        <p>Phone: {shippingInfo.phoneNo}</p>
      </div>

      <div className="cartSummary">
        {cartItems.map((item) => (
          <div key={item._id} className="cartSummaryItem">
            <p>
              {item.name} × {item.quantity}
            </p>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <h3>Total: ₹{totalPrice}</h3>
        <button onClick={proceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
}
