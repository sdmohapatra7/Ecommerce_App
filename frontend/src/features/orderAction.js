import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
         },
        
      };
      const { data } = await axios.post("/api/v1/order/new", orderData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Get single order by ID
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
         },
        
      };
      const { data } = await axios.get(`/api/v1/order/${id}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Get logged-in user’s orders
export const myOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
         },
        
      };
      const { data } = await axios.get("/api/v1/orders/me",config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Admin: get all orders
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
         },
        
      };
      const { data } = await axios.get("/api/v1/admin/orders",config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Admin: update order status
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, orderData }, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
         },
        
      };
      const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Admin: delete order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
         },
        
      };
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
