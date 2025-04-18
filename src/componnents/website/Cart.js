import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Paper,
  Grid,
  TextField,
  Badge,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import Swal from "sweetalert2";
import { useContext } from "react";
import { CartLengthContext } from "../../contetx/CartLengthContext";

const Cart = () => {
  const { cartLength, setCartLength } = useContext(CartLengthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Payment method images
  const paymentMethods = [
    {
      name: "Visa",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    },
    {
      name: "Mastercard",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    },
    {
      name: "PayPal",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
    {
      name: "Apple Pay",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  ];

  useEffect(() => {
    const storedCart = localStorage.getItem("products");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // Ensure we always have an array
        const formattedCart = Array.isArray(parsedCart)
          ? parsedCart.map((item) => ({
              ...item,
              quantity: Number(item.quantity) || 1,
              price: Number(item.price) || 0,
              discount: item.discount ? Number(item.discount) : 0,
            }))
          : [];
        setCartItems(formattedCart);
        setCartLength(formattedCart.length);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem("products");
        setCartItems([]);
        setCartLength(0);
      }
    } else {
      setCartItems([]);
      setCartLength(0);
    }
  }, [setCartLength]);

  const updateCart = (updatedItems) => {
    if (!Array.isArray(updatedItems)) {
      console.error("Attempted to set non-array cart items:", updatedItems);
      updatedItems = [];
    }
    setCartItems(updatedItems);
    localStorage.setItem("products", JSON.stringify(updatedItems));
    setCartLength(updatedItems.length);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedItems);
  };

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        updateCart(updatedItems);
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been removed from cart.",
          icon: "success",
        });
      }
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total + (item.price - (item.discount || 0)) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const calculateSubtotal = (item) => {
    return ((item.price - (item.discount || 0)) * item.quantity).toFixed(2);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          textAlign: "center",
          p: 3,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCartIcon
            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
          />
        </motion.div>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Looks like you haven't added any items to your cart yet.
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 3 } }}>
      {/* Cart Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          data-aos="fade-up"
          variant="h4"
          component="h1"
          sx={{ fontWeight: 700 }}
        >
          Your Shopping Cart
        </Typography>
        <Typography
          data-aos="fade-up"
          data-aos-dekay="200"
          variant="subtitle1"
          color="text.secondary"
        >
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
          cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                exit="exit"
              >
                <Paper
                  data-aos="fade-right"
                  elevation={2}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Grid container spacing={3} alignItems="center">
                    {/* Product Info */}
                    <Grid item xs={12} sm={9}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          cursor: "pointer",
                          minWidth: "440px",
                        }}
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {item.description}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {item.discount ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 600 }}
                            >
                              ${(item.price - item.discount).toFixed(2)}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: "line-through" }}
                            >
                              ${item.price}
                            </Typography>
                            <Badge
                              badgeContent={`-${(
                                (item.discount / item.price) *
                                100
                              ).toFixed(0)}%`}
                              color="error"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            ${item.price}
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, fontWeight: 500 }}
                      >
                        Subtotal: ${calculateSubtotal(item)}
                      </Typography>
                    </Grid>

                    {/* Quantity Controls */}
                    <Grid item xs={12} sm={3}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            padding: "7px 12px",
                            borderRadius: "4px",
                          }}
                        >
                          -
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          inputProps={{
                            min: 1,
                            style: { textAlign: "center", width: 40 },
                          }}
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "divider",
                              },
                            },
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            padding: "7px 12px",
                            borderRadius: "4px",
                          }}
                        >
                          +
                        </IconButton>
                      </Stack>

                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Tooltip title="Remove item" arrow>
                          <Button
                            onClick={() => handleRemoveItem(item.id)}
                            color="error"
                            sx={{
                              transition: "all 0.3s ease",
                              color: "white",
                              backgroundColor: "red",
                              "&:hover": {
                                "& .delete-text": {
                                  opacity: 1,
                                  marginLeft: "8px",
                                },
                              },
                            }}
                          >
                            <DeleteIcon /> Delete
                            <motion.span
                              className="delete-text"
                              initial={{ opacity: 0, width: 0 }}
                              style={{
                                display: "inline-block",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                transition: "all 0.3s ease",
                                opacity: 0,
                                width: 0,
                              }}
                            >
                              Delete
                            </motion.span>
                          </Button>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Section: Shipping Information */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocalShippingIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Shipping Information
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Free standard shipping on all orders. Expected delivery in 3-5
              business days.
            </Typography>
            <Chip
              icon={<LoyaltyIcon />}
              label="Free Shipping"
              color="success"
              variant="outlined"
              sx={{
                mr: 2,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "success.main",
                  color: "white",
                },
              }}
            />
            <Chip
              icon={<PaymentIcon />}
              label="Secure Checkout"
              color="info"
              variant="outlined"
              sx={{
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "info.main",
                  color: "white",
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Paper
              elevation={2}
              sx={{ p: 3, borderRadius: 2, position: "sticky", top: 20 }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Order Summary
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Subtotal ({cartItems.length} items)
                  </Typography>
                  <Typography variant="body1">${calculateTotal()}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography variant="body1">Free</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Estimated Tax
                  </Typography>
                  <Typography variant="body1">$0.00</Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ${calculateTotal()}
                  </Typography>
                </Stack>
              </Box>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/checkout")}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Proceed to Checkout
                </Button>
              </motion.div>

              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                Continue Shopping
              </Button>

              {/* Payment Methods */}
              <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #eee" }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  We accept:
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.name}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={method.image}
                        alt={method.name}
                        style={{
                          height: "24px",
                          borderRadius: "4px",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
