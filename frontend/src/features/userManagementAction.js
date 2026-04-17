import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // your common Axios instance

// ====================== ADMIN USER MANAGEMENT ======================

// Get all users
export const getAllUsers = createAsyncThunk(
  "usermanagement/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/users");
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
      const { data } = await api.get(`/admin/user/${id}`);
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
      const { data } = await api.put(`/admin/user/${id}`, roleData);
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
      const { data } = await api.delete(`/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
