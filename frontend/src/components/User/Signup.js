import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../../features/userAction";
import { clearErrors } from "../../features/userSlice";
import { useNavigate, Link } from "react-router-dom";

// Material UI
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

// React Icons
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./form.css";
import logo from "../images/logo.png";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6+ chars")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success("Account created!");
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <Box className="form-wrapper">
      {/* Left Background Section */}
      <Box className="form-left">
        <Typography variant="h4" className="form-left-text">
          Join Us!
        </Typography>
        <Typography variant="body1" className="form-left-subtext">
          Create your account to get started
        </Typography>
      </Box>

      {/* Right Form Section */}
      <Box className="form-right">
        {/* Logo above card */}
        <div className="form-logo-wrapper">
          <img src={logo} alt="Logo" className="form-logo" />
        </div>
        <Paper elevation={3} className="form-card">
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange }) => (
              <Form className="form-body">
                {/* Name */}
                <Box className="form-field">
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    className="form-input"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser style={{ color: "#555" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <ErrorMessage name="name" component="div" className="error-text" />

                {/* Email */}
                <Box className="form-field">
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    className="form-input"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaEnvelope style={{ color: "#555" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <ErrorMessage name="email" component="div" className="error-text" />

                {/* Password */}
                <Box className="form-field">
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    className="form-input"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock style={{ color: "#555" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <ErrorMessage name="password" component="div" className="error-text" />

                {/* Submit */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>

                {/* Links */}
                <Box sx={{ textAlign: "center", mt: 1 }}>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#1a73e8", textDecoration: "none" }}>
                      Login
                    </Link>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    <Link to="/" style={{ color: "#1a73e8", textDecoration: "none" }}>
                      Continue Shopping
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
}
