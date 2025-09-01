import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../features/userAction";
import { toast } from "react-toastify";

export default function UpdatePassword({ open, handleClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePassword(formData)).unwrap();
      toast.success("Password updated successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      handleClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Password</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            label="Old Password"
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
