// src/redux/slices/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createPayment, verifyPayment } from "./paymentAction";

const initialState = {
  loading: false,
  success: false,
  payment: null,        // COD or verified Razorpay payment
  razorpayOrder: null,  // For frontend checkout
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPayment: (state) => {
      state.loading = false;
      state.success = false;
      state.payment = null;
      state.razorpayOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ================== CREATE PAYMENT ==================
    builder.addCase(createPayment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;

      // COD → direct payment object
      if (action.payload.payment) {
        state.payment = action.payload.payment;
      }

      // Razorpay → backend returns Razorpay order + key
      if (action.payload.razorpayOrder) {
        state.razorpayOrder = {
          ...action.payload.razorpayOrder,
          key_id: action.payload.key_id,
          orderId: action.payload.orderId,
        };
      }
    });
    builder.addCase(createPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ================== VERIFY PAYMENT ==================
    builder.addCase(verifyPayment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.payment = action.payload.payment;
    });
    builder.addCase(verifyPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
