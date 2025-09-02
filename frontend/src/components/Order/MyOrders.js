// src/components/Order/MyOrders.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../features/orderAction";
import Loader from "../layout/Loader/Loader";
// import "./MyOrders.css";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="myOrdersContainer">
      <h2>My Orders</h2>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="orderItem">
            <p>Order #{order._id}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Total: ₹{order.totalPrice}</p>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
}
