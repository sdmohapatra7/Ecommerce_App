import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  FaBox,
  FaDollarSign,
  FaAlignLeft,
  FaWarehouse,
  FaTags,
} from "react-icons/fa";
import { createProduct } from "../../features/productAction";
import { resetSuccess } from "../../features/productSlice";

export default function NewProduct() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.products);

  const [imagesPreview, setImagesPreview] = useState([]);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive(),
    category: Yup.string().required("Category is required"),
    stock: Yup.number().required("Stock is required").min(1),
  });

  // Handle Image Upload
  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setFieldValue("images", files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Submit Form
  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("description", values.description);
    formData.set("price", values.price);
    formData.set("category", values.category);
    formData.set("stock", values.stock);

    values.images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(createProduct(formData));

    resetForm();
    setImagesPreview([]);
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
    }
  }, [success, dispatch]);

  return (
    <Box className="form-wrapper">
      <Paper elevation={3} className="form-card">
        <Typography variant="h5" align="center" gutterBottom>
          Create New Product
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Product created successfully!</Alert>}

        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
            images: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, setFieldValue }) => (
            <Form className="form-body">
              {/* Name */}
              <Box className="form-field">
                <FaBox className="form-icon" />
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-text"
                />
              </Box>

              {/* Description */}
              <Box className="form-field">
                <FaAlignLeft className="form-icon" />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error-text"
                />
              </Box>

              {/* Price */}
              <Box className="form-field">
                <FaDollarSign className="form-icon" />
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-text"
                />
              </Box>

              {/* Category */}
              <Box className="form-field">
                <FaTags className="form-icon" />
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                </TextField>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error-text"
                />
              </Box>

              {/* Stock */}
              <Box className="form-field">
                <FaWarehouse className="form-icon" />
                <TextField
                  fullWidth
                  type="number"
                  label="Stock"
                  name="stock"
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="error-text"
                />
              </Box>

              {/* Images */}
              <Box>
                <Typography variant="subtitle1">Upload Images</Typography>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
                <Box className="image-preview">
                  {imagesPreview.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
                      className="preview-img"
                    />
                  ))}
                </Box>
              </Box>

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Create Product"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
