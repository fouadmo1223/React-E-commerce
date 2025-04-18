import { Outlet } from "react-router-dom";
import Navbar from "./../../componnents/dashboard/Navbar";
import Sidebar from "./../../componnents/dashboard/Sidebar";
import { Box, useTheme, alpha } from "@mui/material";

const DashboardLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.light,
          0.05
        )} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
      }}
    >
      {/* Navbar - fixed at the top */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        <Navbar />
      </Box>

      {/* Sidebar - fixed position */}
      <Box
        sx={{
          position: "fixed",
          top: "64px", // Height of navbar
          left: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: "240px" }, // Match sidebar width
          mt: "64px", // Match navbar height
          p: 3,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
