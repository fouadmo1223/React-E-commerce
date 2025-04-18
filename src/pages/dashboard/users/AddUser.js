import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Avatar,
  Grid,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { Loading } from "notiflix";

import { baseUrl, USER } from "../../../api/api";
import axios from "axios";
import Cookie from "cookie-universal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const roleOptions = [
  { value: "1995", label: "Admin" },
  { value: "2001", label: "User" },
  { value: "2000", label: "Writer" },
  { value: "1999", label: "Product Manger" },
];

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
const cookie = Cookie();
const token = cookie.get("E-commerce");

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= 8 && hasUpperCase && hasNumber;
};

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "2001",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (value.length < 2) return "Name must be at least 2 characters";
        if (value.length > 50) return "Name must be less than 50 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!validateEmail(value)) return "Invalid email address";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (!validatePassword(value))
          return "Password must be at least 8 characters with 1 uppercase letter and 1 number";
        return "";
      case "role":
        if (!value) return "Role is required";
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

  const handleSubmit = (e) => {
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

    if (isValid) {
      // Submit form data
      Loading.arrows({
        clickToClose: true,
        svgSize: "50px",
      });

      axios
        .post(`${baseUrl}/${USER}/add`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFormData({
            name: "",
            email: "",
            password: "",
            role: "",
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User is Added successfully",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            navigate("/dashboard/users");
          });
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.errors.email) {
            setErrors({
              ...errors,
              email: err.response.data.errors.email,
            });
          } else if (err.response.data.errors.password) {
            setErrors({
              ...errors,
              password: err.response.data.errors.password,
            });
          }
        })
        .finally(() => {
          Loading.remove();
          setIsSubmitting(false);
        });
    } else {
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
            Add New User
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                autoComplete="name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Role"
                >
                  {roleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
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
            {isSubmitting ? "Adding User..." : "Add User"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
