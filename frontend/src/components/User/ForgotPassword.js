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
  CircularProgress,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/userAction";
import { toast } from "react-toastify";

export default function ForgotPassword({ open, handleClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user); // optional loading state from Redux

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const result = await dispatch(forgotPassword({ email })).unwrap();
      toast.success(result.message || "Reset link sent to your email!");
      setEmail(""); // reset input
      handleClose(); // close modal
    } catch (error) {
      toast.error(error);
    }
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
            <Button onClick={handleClose} color="secondary" disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
