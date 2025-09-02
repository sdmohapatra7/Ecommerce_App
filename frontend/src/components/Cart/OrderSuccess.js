// src/components/Cart/OrderSuccess.js
import React from "react";
import { Link } from "react-router-dom";
// import "./OrderSuccess.css";

export default function OrderSuccess() {
  return (
    <div className="orderSuccessContainer">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your payment has been processed and your order is confirmed.</p>
      <Link to="/orders">Go to My Orders</Link>
    </div>
  );
}
