import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem('authToken');
// Add product to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const config = { 
                headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },
                
            };
            const { data } = await axios.put("/api/v1/cart/add", { productId, quantity },config);
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
                "Authorization": `Bearer ${token}`
                },
                
            };
            const { data } = await axios.get("/api/v1/cart/",config);
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
                "Authorization": `Bearer ${token}`
                },
                
            };
            const { data } = await axios.delete(`/api/v1/cart/remove/${productId}`,config);
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
                "Authorization": `Bearer ${token}`
                },
                
            };
            const { data } = await axios.delete("/api/cart/clear",config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
