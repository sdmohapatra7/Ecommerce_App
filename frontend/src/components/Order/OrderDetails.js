// src/components/Order/OrderDetails.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../features/orderAction";
import Loader from "../layout/Loader/Loader";
// import "./OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  return (
    <div className="orderDetailsContainer">
      {order && (
        <>
          <h2>Order #{order._id}</h2>
          <p>Status: {order.orderStatus}</p>
          <p>Total: ₹{order.totalPrice}</p>

          <h3>Shipping Info</h3>
          <p>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}</p>
          <p>Phone: {order.shippingInfo.phoneNo}</p>

          <h3>Items</h3>
          {order.orderItems.map((item) => (
            <div key={item.product}>
              <p>{item.name} × {item.quantity} = ₹{item.price * item.quantity}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
