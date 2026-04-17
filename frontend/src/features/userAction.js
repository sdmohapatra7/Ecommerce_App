import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // your common Axios instance

// ====================== USER ACTIONS ======================

// Register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/register", userData, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/login", { email, password }, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Load user (profile)
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/me");
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.get("/logout");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/me/update", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/password/update", passwords);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (emailData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/password/forgot", emailData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, passwords }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/password/reset/${token}`, passwords);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const addWishlist = createAsyncThunk(
  "user/addWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/wishlist/add/${productId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const deleteWishlist = createAsyncThunk(
  "user/deleteWishlist",
  async ( productId , { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/wishlist/remove/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
