import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPayment, verifyPayment } from "../../features/paymentAction";
import { toast } from "react-toastify";
import "./Payment.css";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") || "{}");
  const shippingInfo = JSON.parse(sessionStorage.getItem("shippingInfo") || "{}");
  const orderId = sessionStorage.getItem("orderId") || "dummy_order_id";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleCOD = async () => {
    setLoading(true);
    try {
      await dispatch(createPayment({ orderId, method: "COD" })).unwrap();
      toast.success("Order placed successfully!");
      navigate("/order/success");
    } catch (err) {
      toast.error(err.message || "COD failed");
    }
    setLoading(false);
  };

  const handleRazorpay = async () => {
    setLoading(true);
    try {
      const res = await dispatch(createPayment({ orderId, method: "Razorpay" })).unwrap();
      const { razorpayOrder, key_id } = res;

      const options = {
        key: key_id,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        name: "My Shop",
        description: "Order Payment",
        handler: async function (response) {
          try {
            await dispatch(
              verifyPayment({
                orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            ).unwrap();
            toast.success("Payment successful!");
            navigate("/order/success");
          } catch (err) {
            toast.error(err.message || "Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Razorpay order creation failed");
    }
    setLoading(false);
  };

  return (
    <div className="paymentContainer">
      <h2>Select Payment Method</h2>
      <button onClick={handleCOD} disabled={loading}>
        Cash on Delivery
      </button>
      <button onClick={handleRazorpay} disabled={loading}>
        Pay with Razorpay
      </button>
    </div>
  );
}
