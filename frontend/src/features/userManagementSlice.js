import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getSingleUser, updateUserRole, deleteUser } from "./userManagementAction";

const userManagementSlice = createSlice({
  name: "usermanagement",
  initialState: {
    users: [],
    singleUser: null,
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    clearErrors: (state) => { state.error = null },
    clearMessage: (state) => { state.message = null },
    clearSuccess: (state) => { state.success = false },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.message = action.payload.message;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

      // Get Single User
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      });
  },
});

export const { clearErrors, clearMessage, clearSuccess } = userManagementSlice.actions;
export default userManagementSlice.reducer;
