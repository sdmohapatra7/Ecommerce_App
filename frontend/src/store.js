import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import userReducer from "./features/userSlice";
import orderReducer from "./features/orderSlice";
import cartReducer from "./features/cartSlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    order: orderReducer,
    cart:cartReducer
  },
});
