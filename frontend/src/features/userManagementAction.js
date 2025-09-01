import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL
// ====================== ADMIN USER MANAGEMENT ======================

// Get all users
export const getAllUsers = createAsyncThunk(
  "usermanagement/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/users`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Get single user
export const getSingleUser = createAsyncThunk(
  "usermanagement/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/user/${id}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  "usermanagement/updateUserRole",
  async ({ id, roleData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/admin/user/${id}`, roleData, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "usermanagement/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API_URL}/admin/user/${id}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
