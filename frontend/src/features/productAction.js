// src/redux/productAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem('authToken');
// Fetch all products (for user & admin)
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ keyword = "", currentPage = 1, price = [0, 25000] } = {}, { rejectWithValue }) => {
    try {
      const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


// Fetch product details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Create a new product (Admin)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      
      const config = { 
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
         },
        
      };
      const { data } = await axios.post("/api/v1/admin/product/new", productData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Update product (Admin)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
         },
        
      };
      const { data } = await axios.put(`/api/v1/admin/product/${id}`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Delete product (Admin)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const config = { 
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
         },
        
      };
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Create product review
export const createProductReview = createAsyncThunk(
  "products/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put("/api/v1/review", reviewData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Get all reviews of a product
export const getProductReviews = createAsyncThunk(
  "products/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/reviews?productId=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "products/deleteReview",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
