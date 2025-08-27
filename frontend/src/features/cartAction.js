import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add product to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put("/api/v1/cart/add", { productId, quantity });
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
            const { data } = await axios.get("/api/v1/cart/");
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
            const { data } = await axios.delete(`/api/v1/cart/remove/${productId}`);
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
            const { data } = await axios.delete("/api/cart/clear");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
