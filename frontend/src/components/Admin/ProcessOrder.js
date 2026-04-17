import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrder, getAllOrders } from "../../features/orderAction";
import "./AdminOrders.css";

export default function ProcessOrder({ order, onClose }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(order.orderStatus);

  const handleUpdate = () => {
    if (status === "Delivered" && order.orderStatus === "Delivered") {
      alert("This order is already delivered.");
      return;
    }

    dispatch(updateOrder({ id: order._id, orderData: { status } }))
      .then(() => {
        dispatch(getAllOrders()); // refresh orders after update
        onClose();
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update order status");
      });
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Process Order #{order._id}</h3>

        <p><strong>User:</strong> {order.user?.name || "Guest"}</p>
        <p><strong>Total:</strong> ₹{order.totalPrice}</p>
        <p><strong>Payment:</strong> {order.paymentInfo?.status}</p>
        <p><strong>Current Status:</strong> {order.orderStatus}</p>

        <label>Update Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

        <div className="modalActions">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
