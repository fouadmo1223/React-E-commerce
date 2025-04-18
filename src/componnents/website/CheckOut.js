import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  Payment as PaypalIcon,
  LocalAtm as CashIcon,
  Home as AddressIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Receipt as OrderIcon,
  Checklist as SummaryIcon,
} from "@mui/icons-material";

export default function CheckOut() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    saveInfo: false,
  });
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const total = storedProducts.reduce((sum, product) => {
      return (
        sum + product.price * (1 - product.discount / 100) * product.quantity
      );
    }, 0);
    setTotalPrice(total);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("products");
    navigate("/");
  };

  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <ShoppingCart sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  const steps = ["Shipping", "Payment", "Review"];

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Grid container spacing={4}>
          {/* Shipping Information */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AddressIcon sx={{ mr: 1 }} /> Shipping Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={customerInfo.country}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={customerInfo.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={customerInfo.saveInfo}
                          onChange={handleInputChange}
                          name="saveInfo"
                        />
                      }
                      label="Save this information for next time"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <SummaryIcon sx={{ mr: 1 }} /> Order Summary
              </Typography>
              <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
                {products.map((product) => (
                  <Box
                    key={product.id}
                    sx={{ display: "flex", mb: 2, alignItems: "center" }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                      image={
                        product.images[0]?.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt={product.title}
                    />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle2">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {product.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      $
                      {(
                        product.price *
                        (1 - product.discount / 100) *
                        product.quantity
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Subtotal:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Shipping:</Typography>
                <Typography>$5.99</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Tax:</Typography>
                <Typography>${(totalPrice * 0.1).toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  ${(totalPrice + 5.99 + totalPrice * 0.1).toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                disabled={
                  !customerInfo.firstName ||
                  !customerInfo.lastName ||
                  !customerInfo.email ||
                  !customerInfo.phone ||
                  !customerInfo.address ||
                  !customerInfo.city ||
                  !customerInfo.country ||
                  !customerInfo.zipCode
                }
              >
                Continue to Payment
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
        <Grid container spacing={4}>
          {/* Payment Method */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CreditCard sx={{ mr: 1 }} /> Payment Method
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  aria-label="payment method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <Paper
                    elevation={paymentMethod === "credit_card" ? 3 : 1}
                    sx={{
                      p: 2,
                      mb: 2,
                      border:
                        paymentMethod === "credit_card"
                          ? "1px solid #1976d2"
                          : "1px solid #e0e0e0",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => setPaymentMethod("credit_card")}
                  >
                    <FormControlLabel
                      value="credit_card"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CreditCard sx={{ mr: 1 }} />
                          <Typography>Credit Card</Typography>
                        </Box>
                      }
                    />
                    {paymentMethod === "credit_card" && (
                      <TextField
                        fullWidth
                        label="Card Number"
                        name="cardNumber"
                        value={customerInfo.cardNumber}
                        onChange={handleInputChange}
                        required
                        sx={{ mt: 2 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCard />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Paper>

                  <Paper
                    elevation={paymentMethod === "paypal" ? 3 : 1}
                    sx={{
                      p: 2,
                      mb: 2,
                      border:
                        paymentMethod === "paypal"
                          ? "1px solid #1976d2"
                          : "1px solid #e0e0e0",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PaypalIcon sx={{ mr: 1 }} />
                          <Typography>PayPal</Typography>
                        </Box>
                      }
                    />
                  </Paper>

                  <Paper
                    elevation={paymentMethod === "cash" ? 3 : 1}
                    sx={{
                      p: 2,
                      border:
                        paymentMethod === "cash"
                          ? "1px solid #1976d2"
                          : "1px solid #e0e0e0",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => setPaymentMethod("cash")}
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CashIcon sx={{ mr: 1 }} />
                          <Typography>Cash on Delivery</Typography>
                        </Box>
                      }
                    />
                  </Paper>
                </RadioGroup>
              </FormControl>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button onClick={handleBack}>Back</Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    paymentMethod === "credit_card" && !customerInfo.cardNumber
                  }
                >
                  Review Order
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <OrderIcon sx={{ mr: 1 }} /> Order Summary
              </Typography>
              <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
                {products.map((product) => (
                  <Box
                    key={product.id}
                    sx={{ display: "flex", mb: 2, alignItems: "center" }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                      image={
                        product.images[0]?.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt={product.title}
                    />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle2">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {product.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      $
                      {(
                        product.price *
                        (1 - product.discount / 100) *
                        product.quantity
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Subtotal:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Shipping:</Typography>
                <Typography>$5.99</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Tax:</Typography>
                <Typography>${(totalPrice * 0.1).toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  ${(totalPrice + 5.99 + totalPrice * 0.1).toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeStep === 2 && (
        <Grid container spacing={4}>
          {/* Order Review */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Review
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Shipping Information
                </Typography>
                <Typography>
                  {customerInfo.firstName} {customerInfo.lastName}
                </Typography>
                <Typography>{customerInfo.address}</Typography>
                <Typography>
                  {customerInfo.city}, {customerInfo.country}{" "}
                  {customerInfo.zipCode}
                </Typography>
                <Typography>Phone: {customerInfo.phone}</Typography>
                <Typography>Email: {customerInfo.email}</Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Payment Method
                </Typography>
                <Typography>
                  {paymentMethod === "credit_card" &&
                    "Credit Card •••• •••• •••• " +
                      customerInfo.cardNumber.slice(-4)}
                  {paymentMethod === "paypal" && "PayPal"}
                  {paymentMethod === "cash" && "Cash on Delivery"}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Order Items
                </Typography>
                {products.map((product) => (
                  <Box
                    key={product.id}
                    sx={{ display: "flex", mb: 2, alignItems: "center" }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                      image={
                        product.images[0]?.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt={product.title}
                    />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle2">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {product.quantity} • $
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}{" "}
                        each
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      $
                      {(
                        product.price *
                        (1 - product.discount / 100) *
                        product.quantity
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button onClick={handleBack}>Back</Button>
                <Button variant="contained" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Total
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Subtotal:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Shipping:</Typography>
                <Typography>$5.99</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Tax:</Typography>
                <Typography>${(totalPrice * 0.1).toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  ${(totalPrice + 5.99 + totalPrice * 0.1).toFixed(2)}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                By placing your order, you agree to our Terms and Conditions
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
