import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL
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
      const { data } = await axios.post(`${API_URL}/order/new`, orderData, config);
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
      const { data } = await axios.get(`${API_URL}/order/${id}`,config);
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
      const { data } = await axios.get(`${API_URL}/orders/me`,config);
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
      const { data } = await axios.get(`${API_URL}/admin/orders`,config);
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
      const { data } = await axios.put(`${API_URL}/admin/order/${id}`, orderData, config);
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
      const { data } = await axios.delete(`${API_URL}/admin/order/${id}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
