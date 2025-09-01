import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // common Axios instance

// ====================== CART ACTIONS ======================

// Add product to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/cart/add", { productId, quantity }, {
        headers: { "Content-Type": "application/json" },
      });
      return data; // return updated cart
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get cart items
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/cart", {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Remove cart item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/cart/remove/${productId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.delete("/cart/clear", {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
