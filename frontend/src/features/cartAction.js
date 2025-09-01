import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL
// Add product to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const config = { 
                headers: { 
                "Content-Type": "application/json",
                withCredentials: true,
                },
                
            };
            const { data } = await axios.put(`${API_URL}/cart/add`, { productId, quantity },config);
            return data; // return updated cart
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Get cart items
export const getCartItems = createAsyncThunk(
    "cart/getCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const config = { 
                headers: { 
                "Content-Type": "application/json",
                withCredentials: true,
                },
                
            };
            const { data } = await axios.get(`${API_URL}/cart/`,config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Remove cart item
export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async (productId, { rejectWithValue }) => {
        try {
            const config = { 
                headers: { 
                "Content-Type": "application/json",
                withCredentials: true,
                },
                
            };
            const { data } = await axios.delete(`${API_URL}/cart/remove/${productId}`,config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Clear cart
export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (_, { rejectWithValue }) => {
        try {
            const config = { 
                headers: { 
                "Content-Type": "application/json",
                withCredentials: true,
                },
                
            };
            const { data } = await axios.delete(`${API_URL}/clear`,config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
