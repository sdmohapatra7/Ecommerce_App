import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import your reducers here


// Combine your reducers using combineReducers
const rootReducer = combineReducers({
    some: "someReducer",
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
