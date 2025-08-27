import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { createProduct } from "../../features/productAction";
import { resetSuccess, clearErrors } from "../../features/productSlice";

export default function NewProduct() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.products);

  const [imagesPreview, setImagesPreview] = useState([]);

  // 👉 Initial State
  const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  };

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
    formData.set("price", Number(values.price));
    formData.set("category", values.category);
    formData.set("stock", Number(values.stock));

    // Append images
   values.images.forEach((img) => formData.append("images", img)); // "images" matches multer.array("images")


    dispatch(createProduct(formData));

    resetForm({ values: initialValues }); // reset to initial state
    setImagesPreview([]);
  };

  // Reset errors/success
  useEffect(() => {
    if (error) setTimeout(() => dispatch(clearErrors()), 5000);
    if (success) dispatch(resetSuccess());
  }, [dispatch, error, success]);

  return (
    <Box sx={{ maxWidth: 600, margin: "2rem auto" }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create New Product
        </Typography>

        {error && toast.error(error)}
        {success && toast.error(error)}

        <Formik
          initialValues={initialValues}   // ✅ using state
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              {/* Name */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage name="name" component="div" style={{ color: "red" }} />
              </Box>

              {/* Description */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage name="description" component="div" style={{ color: "red" }} />
              </Box>

              {/* Price */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage name="price" component="div" style={{ color: "red" }} />
              </Box>

              {/* Category */}
              <Box mb={2}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                </TextField>
                <ErrorMessage name="category" component="div" style={{ color: "red" }} />
              </Box>

              {/* Stock */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Stock"
                  name="stock"
                  value={values.stock}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage name="stock" component="div" style={{ color: "red" }} />
              </Box>

              {/* Images */}
              <Box mb={2}>
                <Typography variant="subtitle1">Upload Images</Typography>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  {imagesPreview.map((img, i) => (
                    <img key={i} src={img} alt="preview" width={50} height={50} />
                  ))}
                </Box>
              </Box>

              {/* Submit */}
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
