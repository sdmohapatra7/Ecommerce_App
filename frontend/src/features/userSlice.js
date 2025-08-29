import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  loadUser,
  logoutUser,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "./userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    message: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Load user
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.message = action.payload ? "Profile updated successfully" : null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update password
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.message = action.payload ? "Password updated successfully" : null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Forgot password
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Reset password
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload ? "Password reset successful" : null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearErrors, clearMessage } = userSlice.actions;
export default userSlice.reducer;
