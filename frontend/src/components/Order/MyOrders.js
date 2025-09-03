import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../features/orderAction";
import Loader from "../layout/Loader/Loader";
import OrderDetails from "./OrderDetails";
import "./MyOrders.css";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="myOrdersContainer">
      <h2>My Orders</h2>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="orderItem"
            onClick={() => setSelectedOrder(order)} // ✅ pass full order
          >
            <p>Order #{order._id}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Total: ₹{order.totalPrice}</p>

            {/* ✅ Payment status */}
            <p>
              Payment:{" "}
              <span
                className={
                  order.paymentInfo?.status === "Success"
                    ? "paidStatus"
                    : "unpaidStatus"
                }
              >
                {order.paymentInfo?.status || "Pending"}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder} // ✅ pass full order
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
