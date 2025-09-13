import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCartItems, removeCartItem, clearCart } from "./cartAction";

const initialState = {
    cartItems: [],
    totalPrice: 0,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addToCart.pending, (state) => { state.loading = true; })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cart.cartItems;
                state.totalPrice = action.payload.cart.totalPrice;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Cart Items
            .addCase(getCartItems.pending, (state) => { state.loading = true; })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cart.cartItems;
                state.totalPrice = action.payload.cart.totalPrice;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove Cart Item
            .addCase(removeCartItem.pending, (state) => { state.loading = true; })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cart.cartItems;
                state.totalPrice = action.payload.cart.totalPrice;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Clear Cart
            .addCase(clearCart.pending, (state) => { state.loading = true; })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.cartItems = [];
                state.totalPrice = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
