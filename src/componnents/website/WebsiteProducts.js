import React from "react";
import { Grid } from "@mui/material";
import ProductsAside from "./ProductsAside";
import ProductsSection from "./ProductsSection";

export default function WebsiteProducts() {
  return (
    <Grid container spacing={2} sx={{ position: "relative"  ,padding: "30px",mt:2}}>
      <Grid
        item
        xs={12}
      
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <ProductsSection />
      </Grid>
    </Grid>
  );
}