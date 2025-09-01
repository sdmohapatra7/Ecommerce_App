import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL
// Fetch all products (user & admin)
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ keyword = "", page = 1, price = [0, 25000] } = {}, { rejectWithValue }) => {
    try {
      const link = `${API_URL}/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      const { data } = await axios.get(link);
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
      const { data } = await axios.get(`${API_URL}/product/${id}`);
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
      
      const config = { 
        headers: { 
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      };
      const { data } = await axios.post(`${API_URL}/admin/product/new`, productData, config);
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
      
      const config = { 
        headers: { 
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      };
      const { data } = await axios.put(`${API_URL}/admin/product/${id}`, formData, config);
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
      
      const config = { headers: { withCredentials: true, } };
      const { data } = await axios.delete(`${API_URL}/admin/product/${id}`, config);
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
      
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };
      const { data } = await axios.put(`${API_URL}/review`, reviewData, config);
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
      const { data } = await axios.get(`${API_URL}/reviews?productId=${id}`);
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
      
      const config = { headers: { withCredentials: true, } };
      const { data } = await axios.delete(`${API_URL}/reviews?reviewId=${reviewId}&productId=${productId}`, config);
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
      
      const config = { 
        headers: { 
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };

      // Assuming your backend route looks like: PUT /api/v1/review/:id
      const { data } = await axios.put(`${API_URL}/review/${reviewId}`, reviewData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
