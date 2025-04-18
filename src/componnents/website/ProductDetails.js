import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "./../../api/axios";
import {
  Star,
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Remove,
  Add,
  Close,
  ArrowForward,
} from "@mui/icons-material";

// MUI Components
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
  TextField,
  Grid,
  Paper,
  Rating,
  CircularProgress,
  Alert,
  Tooltip,
  Stack,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { PRODUCTS } from "../../api/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import StatusRespons from "./Fuctions/Statusrespons";
import { CartLengthContext } from "../../contetx/CartLengthContext";
import useCheckUser from "./Fuctions/CheckUser";
import LoginFirst from "./LoginFirst";
export default function ProductDetails() {
  AOS.init();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isLoggedIn = useCheckUser();

  const { cartLength, setCartLength } = useContext(CartLengthContext);

  // Static reviews data
  const staticReviews = [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "https://source.unsplash.com/random/100x100/?portrait1",
      rating: 4,
      date: "2025-03-15",
      comment:
        "Great product! Exactly as described. Very happy with my purchase.",
    },
    {
      id: 2,
      user: "Sam Wilson",
      avatar: "https://source.unsplash.com/random/100x100/?portrait2",
      rating: 5,
      date: "2025-02-28",
      comment: "Excellent quality and fast shipping. Will buy again!",
    },
    {
      id: 3,
      user: "Taylor Smith",
      avatar: "https://source.unsplash.com/random/100x100/?portrait3",
      rating: 3,
      date: "2025-04-02",
      comment: "Good product but took longer to arrive than expected.",
    },
  ];

  // Static similar products
  const staticSimilarProducts = [
    {
      id: 2,
      title: "Premium Comfort Shoes",
      price: 129.99,
      image: "https://source.unsplash.com/random/600x600/?shoes",
      rating: 4.5,
      discount: 15,
    },
    {
      id: 3,
      title: "Elegant Formal Wear",
      price: 199.99,
      image: "https://source.unsplash.com/random/600x600/?formal",
      rating: 4.8,
      discount: 20,
    },
    {
      id: 4,
      title: "Casual Everyday Outfit",
      price: 89.99,
      image: "https://source.unsplash.com/random/600x600/?casual",
      rating: 4.2,
    },
    {
      id: 5,
      title: "Sporty Activewear",
      price: 79.99,
      image: "https://source.unsplash.com/random/600x600/?sport",
      rating: 4.7,
      discount: 10,
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Axios.get(`/${PRODUCTS}`).then((data) => data);
        console.log(res);
        setProduct(res.data[productId - 1]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = (quantity) => {
    if (isLoggedIn) {
      const products = JSON.parse(localStorage.getItem("products")) || [];

      const existingProduct = products.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        products.push({
          ...product,
          quantity: quantity, // Use the passed quantity
        });
        setCartLength(cartLength + 1);
        StatusRespons({ status: "success", message: "Product added to cart" });
      }

      localStorage.setItem("products", JSON.stringify(products));
      setQuantity(1); // Reset quantity after adding

      console.log("Updated cart:", products);
      toast.success(
        existingProduct
          ? `Added ${quantity} more (Total: ${existingProduct.quantity})`
          : `Added ${quantity} to cart`
      );
    } else {
      LoginFirst();
    }
  };
  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist:",
      product.id
    );
  };

  const openImageGallery = (index) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );

  if (!product)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Alert severity="warning">Product not found</Alert>
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container justifyContent={"space-around"} spacing={4}>
        {/* Product Images - Left Side */}
        <Grid item xs={12} md={6}>
          {/* Main Product Image */}
          <Box
            data-aos="fade-right"
            component="img"
            src={product.images[0].image}
            alt="Main product"
            sx={{
              width: "300px",
              height: "500px",
              objectFit: "contain",
              borderRadius: 1,
              cursor: "pointer",
              mb: 2,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            onClick={() => openImageGallery(0)}
          />
        </Grid>

        {/* Product Details - Right Side */}
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={2}
            >
              <Typography
                data-aos="fade-left"
                data-aos-delay="0"
                variant="h4"
                component="h1"
                gutterBottom
              >
                {product.title}
              </Typography>
              <IconButton
                data-aos="fade-left"
                data-aos-delay="0"
                onClick={handleAddToWishlist}
                color={isWishlisted ? "error" : "default"}
                sx={{
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.2s",
                  },
                }}
              >
                {isWishlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Rating
                data-aos="fade-left"
                data-aos-delay="200"
                value={parseFloat(product.rating)}
                precision={0.5}
                readOnly
                emptyIcon={
                  <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Typography
                data-aos="fade-left"
                data-aos-delay="400"
                variant="body2"
                color="text.secondary"
                ml={1}
              >
                {Number(product.rating).toFixed(1)} (
                {product.ratings_number || staticReviews.length} reviews)
              </Typography>
            </Box>

            <Box mb={3}>
              {product.discount ? (
                <Stack
                  data-aos="fade-left"
                  data-aos-delay="400"
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography
                    data-aos="fade-left"
                    data-aos-delay="400"
                    variant="h4"
                    color="primary"
                  >
                    $
                    {(
                      parseFloat(product.price) *
                      (1 - parseFloat(product.discount) / 100)
                    ).toFixed(2)}
                  </Typography>
                  <Typography
                    data-aos="fade-left"
                    data-aos-delay="400"
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ${Number(product.price).toFixed(2)}
                  </Typography>
                  <Chip
                    data-aos="fade-zoom"
                    data-aos-delay="500"
                    label={`${product.discount}% OFF`}
                    size="small"
                    color="error"
                  />
                </Stack>
              ) : (
                <Typography variant="h4">${product.price}</Typography>
              )}
            </Box>

            <Typography
              data-aos="fade-left"
              data-aos-delay="600"
              variant="body1"
              paragraph
              mb={3}
            >
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <Box data-aos="fade-left" data-aos-delay="600" mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Color
                </Typography>
                <Box
                  data-aos="fade-left"
                  data-aos-delay="600"
                  display="flex"
                  gap={1}
                >
                  {product.colors.map((color) => (
                    <Tooltip title={color} key={color}>
                      <Button
                        onClick={() => setSelectedColor(color)}
                        variant={
                          selectedColor === color ? "contained" : "outlined"
                        }
                        sx={{
                          minWidth: 36,
                          height: 36,
                          borderRadius: "50%",
                          backgroundColor: color,
                          border: `2px solid ${
                            selectedColor === color
                              ? "primary.main"
                              : "transparent"
                          }`,
                          "&:hover": {
                            backgroundColor: color,
                            transform: "scale(1.1)",
                          },
                          transition: "transform 0.2s",
                        }}
                        aria-label={color}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <Box data-aos="fade-left" data-aos-delay="600" mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Size
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "contained" : "outlined"}
                      onClick={() => setSelectedSize(size)}
                      sx={{
                        minWidth: 44,
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 2,
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}

            {/* Quantity */}
            <Box mb={4}>
              <Typography
                data-aos="fade-left"
                data-aos-delay="700"
                variant="subtitle1"
                gutterBottom
              >
                Quantity
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  data-aos="fade-right"
                  data-aos-delay="700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  size="small"
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <TextField
                  data-aos="fade-left"
                  data-aos-delay="700"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, value));
                  }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      width: 60,
                      height: 40,
                      padding: "0",
                    },
                  }}
                  variant="outlined"
                  size="small"
                />
                <IconButton
                  data-aos="fade-left"
                  data-aos-delay="700"
                  onClick={() => setQuantity(quantity + 1)}
                  size="small"
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Add to Cart Button */}
            <Button
              data-aos="fade-up"
              data-aos-delay="800"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => handleAddToCart(quantity)}
              startIcon={<ShoppingCart />}
              sx={{
                py: 1.5,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
                transition: "all 0.3s",
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Similar Products Section */}
      <Box mt={8} mb={6}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">Similar Products</Typography>
          <Button endIcon={<ArrowForward />} sx={{ textTransform: "none" }}>
            View All
          </Button>
        </Box>
        <Grid container spacing={4}>
          {staticSimilarProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.image}
                      alt={product.title}
                      sx={{ objectFit: "cover" }}
                    />
                    {product.discount && (
                      <Chip
                        label={`${product.discount}% OFF`}
                        color="error"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          fontWeight: "bold",
                        }}
                      />
                    )}
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      noWrap
                    >
                      {product.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Rating
                        value={product.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        {product.rating.toFixed(1)}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      {product.discount ? (
                        <>
                          <Typography variant="h6" color="primary" mr={1}>
                            $
                            {(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ${product.price.toFixed(2)}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h6" color="primary">
                          ${product.price.toFixed(2)}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Reviews Section */}
      <Box mt={8} mb={6} style={{ overflow: "hidden" }}>
        <Typography data-aos="fade-up" variant="h4" gutterBottom>
          Customer Reviews
        </Typography>
        <Box mb={4}>
          <Typography variant="h6" data-aos="fade-up" data-aos-delay="200">
            Overall Rating: {parseFloat(product.rating).toFixed(1)} (
            {staticReviews.length} reviews)
          </Typography>
          <Rating
            data-aos="fade-up"
            data-aos-delay="400"
            value={parseFloat(product.rating)}
            precision={0.1}
            readOnly
          />
        </Box>

        {staticReviews.map((review, index) => (
          <Paper
            key={review.id}
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: 4,
              },
            }}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                src={review.avatar}
                alt={review.user}
                sx={{ mr: 2, width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {review.user}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
            </Box>
            <Rating value={review.rating} precision={0.5} readOnly />
            <Typography variant="body1" mt={1.5} sx={{ lineHeight: 1.6 }}>
              {review.comment}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Image Gallery Dialog */}
      <Dialog
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Product Gallery</Typography>
            <IconButton
              onClick={() => setGalleryOpen(false)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "background.default" }}>
          <Box
            component="img"
            src={
              product.images[selectedImageIndex]?.image ||
              product.images[0].image
            }
            alt={`Product ${selectedImageIndex + 1}`}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "70vh",
              objectFit: "contain",
              mb: 3,
              borderRadius: 1,
            }}
          />
          <Box display="flex" gap={2} overflow="auto" py={1} px={1}>
            {product.images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img.image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                  border:
                    index === selectedImageIndex
                      ? "3px solid primary.main"
                      : "1px solid divider",
                  transition: "border 0.2s",
                  "&:hover": {
                    border: "3px solid primary.main",
                  },
                }}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
