import React from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export default function Profile({ open, handleClose }) {
  const { user } = useSelector((state) => state.user);

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
        <div className="profile-card" style={{ textAlign: "center" }}>
          <img
            src={user?.avatar?.url || "https://via.placeholder.com/120"}
            alt="User Avatar"
            className="profile-avatar"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          />
          <div className="profile-info" style={{ textAlign: "left" }}>
            <Typography variant="body1">
              <strong>Name:</strong> {user?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Joined:</strong>{" "}
              {user?.createdAt ? String(user.createdAt).substr(0, 10) : ""}
            </Typography>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
