import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function Error403() {
  const theme = useTheme();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          py: 8,
        }}
      >
        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            position: "relative",
            width: 150,
            height: 150,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component={motion.div}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: theme.palette.error.light,
              opacity: 0.2,
            }}
          />
          <LockIcon
            component={motion.svg}
            variants={itemVariants}
            sx={{
              fontSize: 80,
              color: theme.palette.error.main,
            }}
          />
        </Box>

        <Typography
          component={motion.h1}
          variants={itemVariants}
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.error.main} 30%, ${theme.palette.warning.main} 90%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Access Denied
        </Typography>

        <Typography
          component={motion.p}
          variants={itemVariants}
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          You don't have permission to access this page. Please contact the
          administrator if you believe this is an error.
        </Typography>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            Go to Home
          </Button>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="outlined"
            color="primary"
            startIcon={<ContactSupportIcon />}
            onClick={() => navigate("/contact")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            Contact Support
          </Button>
        </Box>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            mt: 6,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Error code: 403
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
