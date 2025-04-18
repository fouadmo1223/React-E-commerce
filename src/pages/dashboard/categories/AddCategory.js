import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Grid,

  Stack,
} from "@mui/material";
import { Add as AddIcon, CloudUpload, Delete } from "@mui/icons-material";
import { Loading } from "notiflix";

import { baseUrl, CATEGORIE } from "../../../api/api";
import axios from "axios";
import Cookie from "cookie-universal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const cookie = Cookie();
const token = cookie.get("E-commerce");

export default function AddCategory() {
  const [formData, setFormData] = useState({
    title: "",
    image: null, // Changed to null to store File object
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    title: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 2MB",
        }));
        return;
      }

      // Validate file type (optional)
      if (!file.type.match("image.*")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select an image file",
        }));
        return;
      }

      // Clear any previous errors
      setErrors((prev) => ({ ...prev, image: "" }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Update form data
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // Clean up memory
    }
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    setErrors((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Title is required";
        if (value.length < 2) return "Title must be at least 2 characters";
        if (value.length > 50) return "Title must be less than 50 characters";
        return "";
      case "image":
        if (!value) return "Image is required";
        return "";
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

    // Validate all fields
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
      Loading.arrows({
        clickToClose: true,
        svgSize: "50px",
      });

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("image", formData.image);

      const res = await axios.post(
        `${baseUrl}/${CATEGORIE}/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        title: "",
        image: null,
      });
      setImagePreview(null);

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category added successfully",
        showConfirmButton: false,
        timer: 1000,
      });

      navigate("/dashboard/categories");
    } catch (err) {
      console.error(err.response);
      if (err.response?.data?.errors?.title) {
        setErrors({
          ...errors,
          title: err.response.data.errors.title,
        });
      }
      if (err.response?.data?.errors?.image) {
        setErrors({
          ...errors,
          image: err.response.data.errors.image,
        });
      }
    } finally {
      Loading.remove();
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "89vh",
        p: 2,
        width: "100%",
      }}
    >
      <Paper
        component={motion.div}
        whileHover={{ scale: 1.01 }}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
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
            transition: "0.5s",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Category
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                autoComplete="title"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
                id="category-image-upload"
              />

              <label htmlFor="category-image-upload">
                <Button
                  fullWidth
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variant="outlined"
                  color="primary"
                  startIcon={<CloudUpload />}
                  sx={{ py: 2, borderRadius: 1 }}
                >
                  Upload Category Image
                </Button>
              </label>

              {errors.image && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mt: 1, display: "block" }}
                >
                  {errors.image}
                </Typography>
              )}

              {imagePreview && (
                <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      maxHeight: 75,
                      objectFit: "contain",
                      borderRadius: 1,
                      border: "1px solid #ddd",
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={removeImage}
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Remove Image
                  </Button>
                </Stack>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Adding Category..." : "Add Category"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
