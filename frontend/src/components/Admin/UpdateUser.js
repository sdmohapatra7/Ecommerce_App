import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage } from "../../features/userManagementSlice";
import { updateUserRole} from "../../features/userManagementAction";
import { toast } from "react-toastify";

export default function UpdateUser({ open, handleClose, user }) {
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      handleClose(); // close popup after success
    }
  }, [error, message, dispatch, handleClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!user?._id) return;
    dispatch(updateUserRole({ id: user._id, roleData: { role: formData.role } }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          disabled
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          disabled
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          select
          fullWidth
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
