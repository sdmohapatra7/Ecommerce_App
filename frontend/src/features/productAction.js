import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // your common Axios instance

// Fetch all products (user & admin)
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ keyword = "", page = 1, price = [0, 25000] } = {}, { rejectWithValue }) => {
    try {
      const link = `/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      const { data } = await api.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch product details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create product (Admin)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin/product/new", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update product (Admin)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete product (Admin)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/admin/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create product review
export const createProductReview = createAsyncThunk(
  "products/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/review", reviewData, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get all reviews of a product
export const getProductReviews = createAsyncThunk(
  "products/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/reviews?productId=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "products/deleteReview",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/reviews?reviewId=${reviewId}&productId=${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update a review
export const updateReview = createAsyncThunk(
  "products/updateReview",
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/review/${reviewId}`, reviewData, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
