import React from "react";
import "./OrderDetails.css";
import { useNavigate } from "react-router-dom";

export default function OrderDetails({ order, onClose }) {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    sessionStorage.setItem(
      "orderInfo",
      JSON.stringify({
        totalPrice: order.totalPrice,
        orderId: order._id,
      })
    );
    navigate("/process/payment");
  };

  const isCOD = order.paymentInfo?.status === "Cash On Delivery";
  const isPaid = order.paymentInfo?.status === "Success";

  return (
    <div className="orderDetailsOverlay">
      <div className="orderDetailsContainer">
        <button className="closeBtn" onClick={onClose}>
          ×
        </button>

        <h2>Order #{order._id}</h2>
        <p>Status: {order.orderStatus}</p>
        <p>Total: ₹{order.totalPrice}</p>

        <h3>Payment Info</h3>
        <p>
          Payment Status:{" "}
          <span
            className={
              isPaid ? "paidStatus" : "unpaidStatus"
            }
          >
            {order.paymentInfo?.status || "Pending"}
          </span>
        </p>

        {/* ✅ Retry button only for online payment & not successful */}
        {!isCOD && !isPaid && (
          <button className="retryBtn" onClick={handleRetryPayment}>
            Retry Payment
          </button>
        )}

        <h3>Shipping Info</h3>
        <p>
          {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
          {order.shippingInfo.state}
        </p>
        <p>Phone: {order.shippingInfo.phoneNo}</p>

        <h3>Items</h3>
        {order.orderItems.map((item) => (
          <div key={item.product}>
            <p>
              {item.name} × {item.quantity} = ₹
              {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
