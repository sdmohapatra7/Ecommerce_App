import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder } from "../../features/orderAction";
import Loader from "../layout/Loader/Loader";
import "./AdminOrders.css";
import ProcessOrder from "./ProcessOrder";

export default function OrderList() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteOrder(deleteId)).then(() => {
        dispatch(getAllOrders()); // refresh after delete
        setShowDeleteConfirm(false);
        setDeleteId(null);
      });
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="adminOrdersContainer">
      <h2>📦 All Orders</h2>
      {orders && orders.length > 0 ? (
        <table className="ordersTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Payment</th>
              <th>User</th>
              <th>Placed At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="orderId">{order._id}</td>
                <td className={`status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </td>
                <td>₹{order.totalPrice}</td>
                <td>
                  {order.paymentInfo?.status === "Cash On Delivery" || "Success"
                    ? "✅ Paid"
                    : "❌ Pending"}
                </td>
                <td>{order.user?.name || "Guest"}</td>
                <td>
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="actions">
                  {/* Show Edit button only if order is not delivered */}
                  {order.orderStatus !== "Delivered" && (
                    <button
                      className="editBtn"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Edit
                    </button>
                  )}

                  {/* Delete button should always show */}
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}

      {/* Edit Modal */}
      {selectedOrder && (
        <ProcessOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>⚠️ Confirm Delete</h3>
            <p>Are you sure you want to delete this order?</p>
            <div className="modalActions">
              <button className="danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
