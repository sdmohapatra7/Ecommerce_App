import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer,productDetailsReducer } from './reducers/productReducer';


// Combine your reducers using combineReducers
const rootReducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    // Add more reducers here
});

// Define your initial state
const initialState = {};

// Set up your middleware
const middleware = [thunk];

// Create the store using configureStore
const store = configureStore({
    reducer: rootReducer,
    middleware: [...middleware],
    devTools: composeWithDevTools(),
    preloadedState: initialState,
});

export default store;
