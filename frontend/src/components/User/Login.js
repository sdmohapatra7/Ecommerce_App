import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loginUser } from "../../features/userAction";
import { clearErrors } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

// Material UI
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

// React Icons
import { FaEnvelope, FaLock } from "react-icons/fa";

import "./form.css";

export default function Login() {
  const dispatch = useDispatch();
  const alert = useAlert();
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
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Login successful!");
      navigate("/admin/product");
    }
  }, [dispatch, error, isAuthenticated, alert, navigate]);

  return (
    <Box className="form-wrapper">
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
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
