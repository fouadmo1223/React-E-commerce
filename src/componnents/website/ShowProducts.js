import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contetx/UserContetx";
import { Axios } from "../../api/axios";
import {
  Box,
  Typography,
  Container,
  styled,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import StatusRespons from "./Fuctions/Statusrespons";
import { CartLengthContext } from "./../../contetx/CartLengthContext";
import useCheckUser from "./Fuctions/CheckUser";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LoginFirst from "./LoginFirst";
// Default product images from Unsplash
const defaultImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  "https://images.unsplash.com/photo-1592155931584-901ac15763e3",
];

// Styled components
const SectionTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(4),
  textAlign: "center",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "80px",
    height: "3px",
    backgroundColor: theme.palette.primary.main,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const ProductCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  transition: "all 0.3s ease",
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
    "& .add-to-cart": {
      opacity: 1,
    },
  },
}));

const ProductImage = styled(Box)({
  height: "200px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  flexShrink: 0,
});

const DiscountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "0.875rem",
  zIndex: 2,
}));

const AddToCartButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: "10px",
  right: "10px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  opacity: 0,
  transition: "opacity 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SliderContainer = styled(Box)({
  width: "100%",
  overflow: "hidden",
  "& .swiper": {
    padding: "0 40px",
    overflow: "hidden",
  },
  "& .swiper-slide": {
    height: "auto",
    padding: "10px",
    boxSizing: "border-box",
  },
  "& .swiper-button-next, & .swiper-button-prev": {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    "&:after": {
      fontSize: "20px",
    },
    "&.swiper-button-disabled": {
      opacity: 0,
    },
  },
});

export default function FirstSection() {
    const isLoggedIn = useCheckUser();
    const [quantity, setQuantity] = useState(1);
  const { cartLength, setCartLength } = useContext(CartLengthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Axios.get("/products?limit=9"); // Get 9 products (4 for top + 5 for main section)
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

const handleAddToCart = (e , product,quantity) => {
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
  
  } else {
   LoginFirst()
  }
};
  return (
    <Box
      sx={{
        pt: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <SectionTitle
          data-aos="fade-up"
          data-aos-duration="1000"
          variant="h4"
          component="h2"
        >
          Featured Products
        </SectionTitle>

        {/* Top 4 Cards Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {products?.data?.slice(0, 4).map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCard data-aos="fade-right" data-aos-duration="1000">
                <Box sx={{ position: "relative" }}>
                  <ProductImage
                    sx={{
                      backgroundImage: `url(${
                        product.image || defaultImages[index]
                      })`,
                    }}
                  />
                  {product.discount && (
                    <DiscountBadge>-{product.discount}%</DiscountBadge>
                  )}
                  <AddToCartButton
                    className="add-to-cart"
                    onClick={(e) => handleAddToCart(e, product, quantity)}
                    aria-label="add to cart"
                  >
                    <AddShoppingCartIcon />
                  </AddToCartButton>
                </Box>
                <Box
                  sx={{ p: 2 }}
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {product.title || `Product ${index + 1}`}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      ${product.price || "49.99"}
                    </Typography>
                    {product.discount && (
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ textDecoration: "line-through" }}
                      >
                        $
                        {(product.price * (1 + product.discount / 100)).toFixed(
                          2
                        )}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </ProductCard>
            </Grid>
          ))}
        </Grid>

        {/* Main Section with Featured Product and Slider */}
        <Grid container spacing={3}>
          {/* Product Slider (Removed pagination bullets) */}
          <Grid item xs={12} md={6}>
            <SliderContainer>
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
              >
                {products?.data?.slice(5, 9).map((product, idx) => (
                  <SwiperSlide key={idx}>
                    <ProductCard>
                      <Box sx={{ position: "relative" }}>
                        <ProductImage
                          sx={{
                            backgroundImage: `url(${
                              product.image || defaultImages[idx + 5]
                            })`,
                          }}
                        />
                        {product.discount && (
                          <DiscountBadge>-{product.discount}%</DiscountBadge>
                        )}
                        <AddToCartButton
                          className="add-to-cart"
                          onClick={(e) => handleAddToCart(e, product, quantity)}
                          aria-label="add to cart"
                        >
                          <AddShoppingCartIcon />
                        </AddToCartButton>
                      </Box>
                      <Box
                        sx={{ p: 2 }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <Typography
                          style={{ cursor: "pointer" }}
                          variant="subtitle1"
                          gutterBottom
                        >
                          {product.title || `Product ${idx + 6}`}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography
                            variant="subtitle2"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                          >
                            ${product.price || "49.99"}
                          </Typography>
                          {product.discount && (
                            <Typography
                              variant="caption"
                              color="text.disabled"
                              sx={{ textDecoration: "line-through" }}
                            >
                              $
                              {(
                                product.price *
                                (1 + product.discount / 100)
                              ).toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </ProductCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SliderContainer>
          </Grid>
        </Grid>

        {/* Most Sales Products Section - Compact Version */}
        {/* Modern Most Sales Products Section */}
      </Container>
      <Box
        sx={{
          mt: 3,
          py: 3,
          backgroundColor: "white",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <SectionTitle variant="h5" component="h3" sx={{ mb: 2 }}>
            Trending Now
          </SectionTitle>

          <Grid container spacing={1}>
            {/* Left Half - Modern Horizontal Slider */}
            <Grid item xs={12} md={6} sx={{ height: 240 }}>
              <SliderContainer
                sx={{
                  height: "100%",
                  "& .swiper-button-next, & .swiper-button-prev": {
                    top: "35%",
                    transform: "translateY(-50%)",
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.4)",
                    },
                  },
                }}
              >
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={16}
                  slidesPerView={2.3}
                  navigation
                >
                  {products?.data?.slice(0, 4).map((product, idx) => (
                    <SwiperSlide key={idx}>
                      <ProductCard
                        sx={{
                          height: 220,
                          flexDirection: "row",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <ProductImage
                          onClick={() => handleProductClick(product.id)}
                          style={{ cursor: "pointer" }}
                          sx={{
                            width: "45%",
                            height: "100%",
                            backgroundImage: `url(${
                              product.image || defaultImages[idx]
                            }?auto=format&fit=crop&w=300&h=300)`,
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "scale(1.02)",
                            },
                          }}
                        />
                        <Box
                          sx={{
                            width: "55%",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            onClick={() => handleProductClick(product.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              noWrap
                            >
                              {product.title || `Product ${idx + 1}`}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {product.description ||
                                "Premium quality product with modern design"}
                            </Typography>
                          </Box>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="primary"
                              >
                                $
                                {product.price || (49.99 + idx * 10).toFixed(2)}
                              </Typography>
                              {product.discount > 0 && (
                                <Typography
                                  variant="caption"
                                  color="text.disabled"
                                  sx={{ textDecoration: "line-through" }}
                                >
                                  $
                                  {(
                                    product.price *
                                    (1 + product.discount / 100)
                                  ).toFixed(2)}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              variant="contained"
                              size="small"
                              fullWidth
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(e, product, quantity);
                              }}
                              sx={{
                                py: 0.5,
                                textTransform: "none",
                                fontSize: "0.75rem",
                              }}
                            >
                              Add to Cart
                            </Button>
                          </Box>
                        </Box>
                        {product.discount > 0 && (
                          <DiscountBadge>-{product.discount}%</DiscountBadge>
                        )}
                      </ProductCard>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SliderContainer>
            </Grid>

            {/* Right Half - Stacked Modern Sliders */}
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 240 }}>
                {/* Top Mini Slider */}
                <Box sx={{ height: "48%" }}>
                  <SliderContainer
                    sx={{
                      height: "100%",
                      "& .swiper-button-next, & .swiper-button-prev": {
                        top: "50%",
                        height: "24px",
                        width: "24px",
                        "&:after": {
                          fontSize: "14px",
                        },
                      },
                    }}
                  >
                    <Swiper
                      modules={[Navigation]}
                      spaceBetween={12}
                      slidesPerView={3.2}
                      navigation
                    >
                      {products?.data?.map((product, idx) => (
                        <SwiperSlide key={idx}>
                          <ProductCard
                            onClick={() => handleProductClick(product.id)}
                            sx={{
                              height: 110,
                              flexDirection: "row",
                              alignItems: "center",
                              p: 1,
                              cursor: "pointer",
                              backgroundColor: "rgba(0,0,0,0.02)",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.04)",
                              },
                            }}
                          >
                            <ProductImage
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 1,
                                backgroundImage: `url(${
                                  product.image || defaultImages[idx + 4]
                                }?auto=format&fit=crop&w=160&h=160)`,
                              }}
                            />
                            <Box
                              sx={{
                                ml: 1,
                                flex: 1,
                                overflow: "hidden",
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="500"
                                noWrap
                              >
                                {product.title || `Product ${idx + 5}`}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="primary"
                                  fontWeight="bold"
                                >
                                  $
                                  {product.price ||
                                    (39.99 + idx * 5).toFixed(2)}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(e, product, quantity);
                                  }}
                                  sx={{
                                    ml: "auto",
                                    backgroundColor: "primary.light",
                                    "&:hover": {
                                      backgroundColor: "primary.main",
                                      color: "white",
                                    },
                                  }}
                                >
                                  <AddShoppingCartIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          </ProductCard>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </SliderContainer>
                </Box>

                {/* Bottom Mini Slider */}
                <Box sx={{ height: "48%" }}>
                  <SliderContainer sx={{ height: "100%" }}>
                    <Swiper
                      modules={[Navigation]}
                      spaceBetween={12}
                      slidesPerView={3.2}
                      navigation
                    >
                      {products?.data?.map((product, idx) => (
                        <SwiperSlide key={idx}>
                          <ProductCard
                            onClick={() => handleProductClick(product.id)}
                            sx={{
                              height: 110,
                              flexDirection: "row-reverse", // Image on right
                              alignItems: "center",
                              p: 1,
                              cursor: "pointer",
                              "&:hover": {
                                boxShadow: 1,
                              },
                            }}
                          >
                            <ProductImage
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 1,
                                backgroundImage: `url(${
                                  product.image || defaultImages[idx + 7]
                                }?auto=format&fit=crop&w=160&h=160)`,
                              }}
                            />
                            <Box
                              sx={{
                                mr: 1,
                                flex: 1,
                                overflow: "hidden",
                                textAlign: "right", // Align text to right
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="500"
                                noWrap
                              >
                                {product.title || `Product ${idx + 8}`}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="primary"
                                  fontWeight="bold"
                                >
                                  $
                                  {product.price ||
                                    (29.99 + idx * 5).toFixed(2)}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(e, product, quantity);
                                  }}
                                  sx={{
                                    ml: "auto",
                                    backgroundColor: "primary.light",
                                    "&:hover": {
                                      backgroundColor: "primary.main",
                                      color: "white",
                                    },
                                  }}
                                >
                                  <AddShoppingCartIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          </ProductCard>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </SliderContainer>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
