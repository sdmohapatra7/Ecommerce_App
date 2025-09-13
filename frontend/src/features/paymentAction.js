import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // common Axios instance

// ====================== PAYMENT ACTIONS ======================

// Create payment (COD / Razorpay / PayU)
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async ({ orderId, method }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/payment",
        { orderId, method },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Verify Razorpay Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/payment/verify", paymentData, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
