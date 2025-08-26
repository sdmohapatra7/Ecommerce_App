import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { Close } from "@mui/icons-material";

export default function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    handleClose(); // close popup after submit
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Forgot Password
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
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <TextField
            type="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail style={{ color: "#555" }} />
                </InputAdornment>
              ),
            }}
          />

          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Send Reset Link
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
