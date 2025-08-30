import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { loginUser } from "../../features/userAction";
import { clearErrors } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

// Material UI
import { TextField, Button, Box, Typography, Paper,InputAdornment } from "@mui/material";

// React Icons
import { FaEnvelope, FaLock } from "react-icons/fa";

import "./form.css";
import logo from "../images/logo.png"
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success("Login successful!");
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <Box className="form-wrapper">
      {/* Left Background Section */}
      <Box className="form-left">
        <Typography variant="h4" className="form-left-text">
          Welcome Back!
        </Typography>
        <Typography variant="body1" className="form-left-subtext">
          Please login to continue
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
          Sign In
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange }) => (
            <Form className="form-body">
              {/* Email */}
              <Box className="form-field">
                {/* <FaEnvelope className="form-icon" /> */}
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
                {/* <FaLock className="form-icon" /> */}
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
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
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      </Box>
    </Box>
  );
}
