import React, { useState } from "react";
import { useEffect } from "react";
import { CATEGORIES, PRODUCTS } from "../../api/api";
import ProductCard from "./ProductCard";
import { Grid, Typography, Box, Divider, useTheme, alpha } from "@mui/material";
import useGetData from "../../hooks/useGetData";
import { useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import PaginatedItems from "../dashboard/pagination/ReactPagiantion";
import AOS from "aos";
import "aos/dist/aos.css";
import useCheckUser from "./Fuctions/CheckUser";
export default function ProductsSection() {
  const isLoggedIn = useCheckUser();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [aosInitialized, setAosInitialized] = useState(false);
  const { getData } = useGetData();
  const theme = useTheme();
  AOS.init();

  const pageCount = useMemo(
    () => Math.ceil(products.length / 10),
    [products.length]
  );

  const currentItems = useMemo(
    () => products.slice(page * 10, (page + 1) * 10),
    [products, page]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allProducts, allCategories] = await Promise.all([
          getData(PRODUCTS),
          getData(CATEGORIES),
        ]);
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "85vh",
          width: "90vw",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 100,
            height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Animated loader */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Outer circle */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: `5px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderTopColor: theme.palette.primary.main,
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  "0%": {
                    transform: "rotate(0deg)",
                  },
                  "100%": {
                    transform: "rotate(360deg)",
                  },
                },
              }}
            />
            {/* Inner circle */}
            <Box
              sx={{
                position: "absolute",
                top: "25%",
                left: "25%",
                width: "50%",
                height: "50%",
                borderRadius: "50%",
                border: `3px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                borderTopColor: theme.palette.secondary.main,
                animation: "spinReverse 1.5s linear infinite",
                "@keyframes spinReverse": {
                  "0%": {
                    transform: "rotate(0deg)",
                  },
                  "100%": {
                    transform: "rotate(-360deg)",
                  },
                },
              }}
            />
          </Box>
          {/* Loading text */}
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 0.6 },
                "50%": { opacity: 1 },
              },
            }}
          >
            Loading Products...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* Modern Centered Title Section with AOS Animation */}
      <Box
        sx={{
          mb: 6,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          data-aos="fade-right"
          sx={{
            fontWeight: 700,
            fontStyle: "italic",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            display: "inline-block",
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.light,
                    0.9
                  )} 30%, ${alpha(theme.palette.secondary.light, 0.7)} 90%)`
                : `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
            letterSpacing: "1px",
            position: "relative",
            pb: 2,
            "&:before, &:after": {
              content: '""',
              position: "absolute",
              height: "2px",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: alpha(theme.palette.text.secondary, 0.3),
              width: "40%",
            },
            "&:after": {
              bottom: "-8px",
              width: "30%",
            },
          }}
        >
          Curated Collection
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            fontStyle: "italic",
            color: alpha(theme.palette.text.secondary, 0.8),
            letterSpacing: "0.5px",
          }}
        >
          Discover our handpicked selection of premium products
        </Typography>
      </Box>

      {/* Products Grid */}
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          alignContent: "flex-start",
          mb: 2,
        }}
      >
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>

      {/* Pagination */}
      <div className="my-4" data-aos="fade-up">
        {products.length > 10 && (
          <PaginatedItems
            setPage={setPage}
            itemsPerPage={currentItems}
            items={products}
            pageCount={pageCount}
          />
        )}
      </div>
    </>
  );
}
