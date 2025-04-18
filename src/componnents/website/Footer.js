import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
        color: "#2d3748", // Dark gray/blue text color
        py: 6,
        mt: "auto",
        borderTop: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent={"space-evenly"} spacing={4}>
          {/* Column 1 - Logo and Name */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="div" color="primary">
                Website Name
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "#4a5568" }}>
              Making your life better with our products and services.
            </Typography>
          </Grid>

          {/* Column 2 - Website Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                to="/"
                style={{
                  display: "inline-block",
                  marginBottom: "8px",
                  color: "#1976d2",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.color = "#4a5568"; // MUI primary color
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.color = "#1976d2";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Home
              </Link>
              <Link
                to="/products"
                style={{
                  display: "inline-block",
                  marginBottom: "8px",
                  color: "#1976d2",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.color = "#4a5568"; // MUI primary color
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.color = "#1976d2";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Products
              </Link>
              <Link
                to="/cart"
                style={{
                  display: "inline-block",
                  marginBottom: "8px",
                  color: "#1976d2",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.color = "#4a5568"; // MUI primary color
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.color = "#1976d2";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Cart
              </Link>
              <Link
                to="/contact"
                style={{
                  display: "inline-block",
                  marginBottom: "8px",
                  color: "#1976d2",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(10px)";
                  e.currentTarget.style.color = "#4a5568"; // MUI primary color
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.color = "#1976d2";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Column 3 - Policies */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Policies
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                href="#"
                color="#4a5568"
                underline="hover"
                sx={{
                  mb: 1,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="#4a5568"
                underline="hover"
                sx={{
                  mb: 1,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                  },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                color="#4a5568"
                underline="hover"
                sx={{
                  mb: 1,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                  },
                }}
              >
                Refund Policy
              </Link>
              <Link
                href="#"
                color="#4a5568"
                underline="hover"
                sx={{
                  mb: 1,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                  },
                }}
              >
                Shipping Policy
              </Link>
              <Link
                href="#"
                color="#4a5568"
                underline="hover"
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                  },
                }}
              >
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* Column 4 - Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <IconButton
                aria-label="Facebook"
                href="#"
                sx={{
                  color: "#4a5568",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                    backgroundColor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                href="#"
                sx={{
                  color: "#4a5568",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                    backgroundColor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="#"
                sx={{
                  color: "#4a5568",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                    backgroundColor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                href="#"
                sx={{
                  color: "#4a5568",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(10px)",
                    color: "primary.main",
                    backgroundColor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="#4a5568">
              Subscribe to our newsletter
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            pt: 4,
            mt: 4,
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="body2" align="center" color="#4a5568">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
