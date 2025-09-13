import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  // Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { updateProfile, loadUser } from "../../features/userAction";
import { toast } from "react-toastify";

export default function Profile({ open, handleClose }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await dispatch(updateProfile({ name, email })).unwrap();
      toast.success("Profile updated successfully");
      dispatch(loadUser()); // refresh
      handleClose();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        My Profile
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <div style={{ textAlign: "center" }}>
          <img
            src={user?.avatar?.url || "https://via.placeholder.com/120"}
            alt="User Avatar"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          />
        </div>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
