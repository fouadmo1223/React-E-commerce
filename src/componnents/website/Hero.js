import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3a86ff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#8338ec",
      contrastText: "#fff",
    },
  },
});

// Animation keyframes
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const HeroContainer = styled("div")({
  position: "relative",
  height: "calc(100vh - 69px)",
  minHeight: "500px",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
  zIndex: 1,
});

const ContentWrapper = styled(Container)({
  position: "relative",
  zIndex: 2,
  textAlign: "left",
  paddingLeft: "5%",
});

const AnimatedContent = styled("div")({
  maxWidth: "600px",
  "& > *": {
    animation: `${fadeInLeft} 0.8s ease-out forwards`,
    opacity: 0,
  },
});

// Hero slides data with product/abstract images
const heroSlides = [
  {
    id: 1,
    title: "PREMIUM WATCHES",
    subtitle: "Luxury Collection",
    description:
      "Precision engineered timepieces crafted with exceptional attention to detail.",
    bgImage:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    button1: "View Collection",
    button2: "Learn More",
  },
  {
    id: 2,
    title: "MODERN FURNITURE",
    subtitle: "Contemporary Designs",
    description:
      "Minimalist furniture that combines functionality with aesthetic appeal.",
    bgImage:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    button1: "Browse Products",
    button2: "Our Designers",
  },
  {
    id: 3,
    title: "TECH ACCESSORIES",
    subtitle: "Innovative Gadgets",
    description:
      "Cutting-edge technology accessories for the modern professional.",
    bgImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    button1: "Shop Now",
    button2: "Tech Specs",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroContainer>
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          
          loop={true}
          onSlideChange={handleSlideChange}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Overlay />

        <ContentWrapper maxWidth="xl">
          <AnimatedContent key={activeIndex}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontWeight: 500,
                letterSpacing: "3px",
                mb: 2,
                color: "rgba(255,255,255,0.8)",
                animationDelay: "0.2s",
              }}
            >
              {heroSlides[activeIndex].subtitle}
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                lineHeight: 1.2,
                color: "white",
                animationDelay: "0.4s",
              }}
            >
              {heroSlides[activeIndex].title}
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                mb: 4,
                color: "rgba(255,255,255,0.8)",
                animationDelay: "0.6s",
              }}
            >
              {heroSlides[activeIndex].description}
            </Typography>

            <Box
              sx={{
                animation: `${fadeInUp} 0.8s ease-out forwards`,
                opacity: 0,
                animationDelay: "0.8s",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mr: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {heroSlides[activeIndex].button1}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {heroSlides[activeIndex].button2}
              </Button>
            </Box>
          </AnimatedContent>
        </ContentWrapper>
      </HeroContainer>
    </ThemeProvider>
  );
}
