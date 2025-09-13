import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/userAction";
import { toast } from "react-toastify";
import { IconButton, InputAdornment, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await dispatch(
        resetPassword({ token, passwords: { password: newPassword, confirmPassword } })
      ).unwrap();
      toast.success("Password reset successful!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type={showNewPassword ? "text" : "password"}
          label="New Password"
          variant="outlined"
          fullWidth
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          variant="outlined"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
