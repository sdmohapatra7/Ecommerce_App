// src/components/Cart/Shipping.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Shipping.css";

export default function Shipping() {
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for PIN and phone
    if (name === "pinCode" && value.length > 6) return;
    if (name === "phoneNo" && value.length > 10) return;

    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sessionStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    navigate("/order/confirm");
  };

  return (
    <div className="shippingContainer">
      <h2>Shipping Details</h2>
      <form onSubmit={submitHandler} className="shippingForm">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingInfo.state}
          onChange={handleChange}
          required
        />
        <select
          name="country"
          value={shippingInfo.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
        </select>
        <input
          type="number"
          name="pinCode"
          placeholder="Pin Code"
          value={shippingInfo.pinCode}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phoneNo"
          placeholder="Phone Number"
          value={shippingInfo.phoneNo}
          onChange={handleChange}
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
