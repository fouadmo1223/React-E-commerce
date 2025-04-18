import React, { useContext, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Grid, styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import CheckUser from "./Fuctions/CheckUser";
import useCheckUser from "./Fuctions/CheckUser";
import { isXMLDoc } from "jquery";
import { IsoOutlined } from "@mui/icons-material";
import StatusRespons from "./Fuctions/Statusrespons";
import { CartLengthContext } from "../../contetx/CartLengthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LoginFirst from "./LoginFirst";
const StyledCard = styled(Card)({
  maxHeight: 320,
  width: "100%",
  height: "100%",
  position: "relative",
  transition: "box-shadow 0.3s ease, transform 0.3s ease",
  "&:hover": {
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transform: "translateY(-5px)",
    "& .hover-buttons": {
      opacity: 1,
      "& .button-text": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
    "& .product-image": {
      transform: "scale(1.1) rotate(5deg)",
    },
  },
});

const HoverButtons = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  opacity: 0,
  transition: "opacity 0.3s ease",
});

const ButtonWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "24px",
  padding: "4px 8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
});

const ButtonText = styled(Typography)({
  opacity: 0,
  transform: "translateX(-10px)",
  transition: "all 0.3s ease 0.1s",
  fontSize: "0.875rem",
  fontWeight: 500,
  marginLeft: "8px",
  whiteSpace: "nowrap",
});

const PriceBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: "8px 0",
});

const OldPrice = styled(Typography)({
  textDecoration: "line-through",
  color: "text.secondary",
});

const ImageWrapper = styled(Box)({
  overflow: "hidden",
  position: "relative",
  flexGrow: 1,
});

const ProductImage = styled(CardMedia)({
  transition: "transform 0.5s ease",
  height: 250,
  width: "100%",
});

const ProductTitle = styled(Typography)({
  cursor: "pointer",
  display: "inline-block",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateX(10px)",
    color: "primary.main",
  },
});

const StarRating = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  marginLeft: "8px",
});
AOS.init();

export default function ProductCard({ product }) {
  const { cartLength, setCartLength } = useContext(CartLengthContext);

  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useCheckUser();
  const navigate = useNavigate();
  const { id, images, title, description, price, discount, rating } =
    product || {};

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

  const handleAddToFavorites = () => {
    console.log(`Added to favorites: ${id}`);
    // Add your favorites logic here
  };

  const handleTitleClick = () => {
    navigate(`/product/${id}`);
  };

  // Create star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIcon key={i} fontSize="small" sx={{ color: "gold" }} />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarIcon key={i} fontSize="small" sx={{ color: "gold" }} />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            fontSize="small"
            sx={{ color: "text.disabled" }}
          />
        );
      }
    }

    return <StarRating title={`Rating: ${rating}`}>{stars}</StarRating>;
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
        data-aos="flip-left"
      >
        <ImageWrapper>
          <ProductImage
            className="product-image"
            component="img"
            image={images[0].image}
            alt={title}
            sx={{ objectFit: "cover" }}
          />
          <HoverButtons className="hover-buttons">
            <ButtonWrapper onClick={handleAddToFavorites}>
              <IconButton
                aria-label="add to favorites"
                sx={{
                  color: "red",
                  padding: "4px",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
              <ButtonText className="button-text">Add to Favorites</ButtonText>
            </ButtonWrapper>

            <ButtonWrapper onClick={() => handleAddToCart(quantity)}>
              <IconButton
                aria-label="add to cart"
                sx={{
                  color: "primary.main",
                  padding: "4px",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <ShoppingBagIcon fontSize="small" />
              </IconButton>
              <ButtonText className="button-text">Add to Cart</ButtonText>
            </ButtonWrapper>
          </HoverButtons>
        </ImageWrapper>
        <CardContent>
          <ProductTitle
            gutterBottom
            variant="h6"
            component="div"
            onClick={handleTitleClick}
          >
            {title}
          </ProductTitle>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {description}
          </Typography>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <PriceBox>
              <Typography variant="h6" color="primary">
                ${(price - (discount / 100) * price).toFixed(2)}
              </Typography>
              {price !== discount && (
                <OldPrice variant="body2">${price}</OldPrice>
              )}
            </PriceBox>
            {renderStars()}
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
}
