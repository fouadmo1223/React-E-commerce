import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Grid,
  Divider,
  CircularProgress,
  Chip,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon, CloudUpload, Delete } from "@mui/icons-material";
import axios from "axios";
import Cookie from "cookie-universal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../api/api";
import useGetData from "../../../hooks/useGetData";
import Loading from "../../../componnents/Loading";
import { Loading as Load } from "notiflix";

const cookie = Cookie();
const token = cookie.get("E-commerce");

export default function AddProduct() {
  const { getData } = useGetData();

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    about: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    about: "",
    images: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await getData("categories");

        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load categories. Please try again later.",
        });
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      if (files.length + formData.images.length > 5) {
        setErrors((prev) => ({
          ...prev,
          images: "Maximum 5 images allowed",
        }));
        return;
      }

      const validFiles = [];
      const invalidFiles = [];

      files.forEach((file) => {
        if (file.size > 2 * 1024 * 1024) {
          invalidFiles.push(`${file.name} - Size exceeds 2MB`);
          return;
        }

        if (!file.type.match("image.*")) {
          invalidFiles.push(`${file.name} - Not an image file`);
          return;
        }

        validFiles.push(file);
      });

      if (invalidFiles.length > 0) {
        setErrors((prev) => ({
          ...prev,
          images: invalidFiles.join(", "),
        }));
      }

      if (validFiles.length > 0) {
        setErrors((prev) => ({ ...prev, images: "" }));
        const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...previewUrls]);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...validFiles],
        }));
      }
    }
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));

    if (newImages.length === 0 && errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "category":
        return !value ? "Category is required" : "";
      case "title":
        if (!value.trim()) return "Title is required";
        if (value.length < 3) return "Title must be at least 3 characters";
        if (value.length > 100) return "Title must be less than 100 characters";
        return "";
      case "description":
        if (!value.trim()) return "Description is required";
        if (value.length < 10)
          return "Description must be at least 10 characters";
        if (value.length > 1000)
          return "Description must be less than 1000 characters";
        return "";
      case "price":
        if (!value.trim()) return "Price is required";
        if (isNaN(value) || parseFloat(value) <= 0)
          return "Price must be a positive number";
        return "";
      case "discount":
        if (
          value &&
          (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)
        )
          return "Discount must be between 0 and 100";
        return "";
      case "about":
        if (!value.trim()) return "About section is required";
        if (value.length < 20) return "About must be at least 20 characters";
        if (value.length > 2000)
          return "About must be less than 2000 characters";
        return "";
      case "images":
        return value.length === 0 ? "At least one image is required" : "";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      Load.arrows({
        clickToClose: false,
        svgSize: "50px",
      });

      const formDataToSend = new FormData();
      formDataToSend.append("category", formData.category);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discount", formData.discount || 0);
      formDataToSend.append("About", formData.about);

      formData.images.forEach((image) => {
        formDataToSend.append("images[]", image);
      });

      const res = await axios.post(`${baseUrl}/product/add`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        category: "",
        title: "",
        description: "",
        price: "",
        discount: "",
        about: "",
        images: [],
      });
      setImagePreviews([]);

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added successfully",
        showConfirmButton: false,
        timer: 1000,
      });

      navigate("/dashboard/products");
    } catch (err) {
      console.error(err.response);
      if (err.response?.data?.errors) {
        const apiErrors = err.response.data.errors;
        const newErrors = {};

        Object.keys(apiErrors).forEach((key) => {
          newErrors[key] = apiErrors[key].join(", ");
        });

        setErrors(newErrors);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add product. Please try again.",
        });
      }
    } finally {
      Load.remove();
      setIsSubmitting(false);
    }
  };

  return loadingCategories ? (
    <div
      className="d-flex m-auto justify-content-center align-items-center"
      style={{ height: "89vh" }}
    >
      <Loading />
    </div>
  ) : (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ p: 3, width: "100%" }}
    >
      <Paper
        component={motion.div}
        whileHover={{ scale: 1.01 }}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 2,
          boxShadow: 3,
          transition: ".5s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Product
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px", // consistent spacing between fields
          }}
        >
          {/* First Row - Category (50 Width) */}

          {/* Second Row - Title and Price (50% width each on desktop) */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "24px",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.category}
                helperText={errors.category}
                variant="outlined"
                disabled={loadingCategories}
              >
                {loadingCategories && categories ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : categories.length === 0 ? (
                  <MenuItem disabled>No categories available</MenuItem>
                ) : (
                  [
                    <MenuItem key="empty" value="">
                      <em>Select a category</em>
                    </MenuItem>,
                    ...categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.title}
                      </MenuItem>
                    )),
                  ]
                )}
              </TextField>
            </Box>

            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.title}
                helperText={errors.title}
                variant="outlined"
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "24px",
            }}
          >
            {/* Third Row - Discount (50% width on desktop) */}
            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <TextField
                fullWidth
                label="Discount (%)"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.discount}
                helperText={errors.discount}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <Typography color="textSecondary" sx={{ ml: 1 }}>
                      %
                    </Typography>
                  ),
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.price}
                helperText={errors.price}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Typography color="textSecondary" sx={{ mr: 1 }}>
                      $
                    </Typography>
                  ),
                }}
              />
            </Box>
          </Box>
          {/* Full Width Fields */}
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.description}
              helperText={errors.description}
              variant="outlined"
              multiline
              rows={4}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="About Product"
              name="about"
              value={formData.about}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.about}
              helperText={errors.about}
              variant="outlined"
              multiline
              rows={6}
            />
          </Box>

          {/* Images Section */}
          <Box sx={{ width: "100%" }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Product Images
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Upload up to 5 images (2MB max each)
            </Typography>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              id="product-images-upload"
              multiple
            />

            <label htmlFor="product-images-upload">
              <Button
                fullWidth
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variant="outlined"
                color="primary"
                startIcon={<CloudUpload />}
                sx={{ py: 2, borderRadius: 1, mb: 2 }}
              >
                Upload Product Images
              </Button>
            </label>

            {errors.images && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mt: 1, display: "block" }}
              >
                {errors.images}
              </Typography>
            )}

            {imagePreviews.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr",
                  },
                  gap: "12px",
                  mt: 2,
                }}
              >
                {imagePreviews.map((preview, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      p: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "contain",
                        borderRadius: 1,
                      }}
                    />
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => removeImage(index)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "background.paper",
                      }}
                    >
                      Remove
                    </Button>
                    <Chip
                      label={`Image ${index + 1}`}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        bgcolor: "background.paper",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Submit Button */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ px: 6, py: 1.5 }}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
