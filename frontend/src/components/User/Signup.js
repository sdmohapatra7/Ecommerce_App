import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { registerUser } from "../../features/userAction";
import { clearErrors } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

// Material UI
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

// React Icons
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import "./form.css";

export default function Signup() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "At least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Signup successful!");
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated, alert, navigate]);

  return (
    <Box className="form-wrapper">
      <Paper elevation={3} className="form-card">
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
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
                <FaUser className="form-icon" />
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage name="name" component="div" className="error-text" />
              </Box>

              {/* Email */}
              <Box className="form-field">
                <FaEnvelope className="form-icon" />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage name="email" component="div" className="error-text" />
              </Box>

              {/* Password */}
              <Box className="form-field">
                <FaLock className="form-icon" />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage name="password" component="div" className="error-text" />
              </Box>

              {/* Submit */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
