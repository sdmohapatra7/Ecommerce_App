import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL

// ====================== USER ACTIONS ======================

// Register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData, {
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
      const { data } = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
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
      const { data } = await axios.get(`${API_URL}/me`, { withCredentials: true });
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${API_URL}/logout`,{ withCredentials: true });
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
      const { data } = await axios.put(`${API_URL}/me/update`, userData, { withCredentials: true });
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
      const { data } = await axios.put(`${API_URL}/password/update`, passwords, { withCredentials: true });
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
      const { data } = await axios.post(`${API_URL}/password/forgot`, emailData,
        { withCredentials: true },
      );
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
      const { data } = await axios.put(`${API_URL}/password/reset/${token}`, passwords,
        { withCredentials: true },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

