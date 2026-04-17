// src/redux/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  updateReview 
} from "./productAction";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 4,
  success: false,
  reviews: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearErrors: (state) => { state.error = null; },
    resetSuccess: (state) => { state.success = false; },
    clearReviews: (state) => { state.reviews = []; },
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => { state.loading = true; })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get product details
      .addCase(getProductDetails.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(getProductDetails.fulfilled, (state, action) => { 
        state.loading = false; 
        state.product = action.payload.product; 
      })
      .addCase(getProductDetails.rejected, (state, action) => { 
        state.loading = false;
         state.error = action.payload; 
        })

      // Create product
      .addCase(createProduct.pending, (state) => { 
        state.loading = true;
       })
      .addCase(createProduct.fulfilled, (state, action) => { 
        state.loading = false; 
        state.success = true; 
        state.product = action.payload; 
      })
      .addCase(createProduct.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Update product
      .addCase(updateProduct.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(updateProduct.fulfilled, (state, action) => { 
        state.loading = false; 
        state.success = true; 
        state.product = action.payload; 
      })
      .addCase(updateProduct.rejected, (state, action) => {
         state.loading = false; 
         state.error = action.payload;
         })

      // Delete product
      .addCase(deleteProduct.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(deleteProduct.fulfilled, (state) => { 
        state.loading = false; 
        state.success = true; 
      })
      .addCase(deleteProduct.rejected, (state, action) => {
         state.loading = false; 
         state.error = action.payload; 
        })

      // Reviews
      .addCase(createProductReview.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(createProductReview.fulfilled, (state) => { 
        state.loading = false; 
        state.success = true;
       })
      .addCase(createProductReview.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      .addCase(getProductReviews.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
         state.loading = false; 
         state.reviews = action.payload; 
        })
      .addCase(getProductReviews.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      .addCase(deleteReview.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(deleteReview.fulfilled, (state) => { 
        state.loading = false; 
        state.success = true; })
      .addCase(deleteReview.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Replace the updated review in state.reviews
        state.reviews = state.reviews.map((rev) =>
          rev._id === action.payload._id ? action.payload : rev
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, resetSuccess, clearReviews } = productSlice.actions;
export default productSlice.reducer;
