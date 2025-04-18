import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert,
  Fade,
  useTheme,
  Paper,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Container,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Send as SendIcon,
  GitHub as GitHubIcon,
  Star as StarIcon,
} from "@mui/icons-material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/fm0850020@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Your message has been sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content:
        "Working with this team was an absolute pleasure. Their responsiveness and creative solutions helped us achieve our goals faster than we expected.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO, TechStart",
      content:
        "The level of professionalism and technical expertise is outstanding. They delivered our project on time and within budget with excellent results.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Small Business Owner",
      content:
        "As a small business, we needed affordable but high-quality service. They exceeded our expectations in every way possible.",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 4,
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.",
    },
    {
      question: "What are your business hours?",
      answer:
        "Our team is available Monday through Friday from 9:00 AM to 6:00 PM EST. We're closed on weekends and major holidays.",
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer:
        "Yes, we offer various support packages tailored to your needs. All our projects come with 30 days of complimentary support.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers. For large projects, we can discuss customized payment plans.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      }}
    >
      {/* Main Contact Section */}
      <Container maxWidth="xl">
        <Box
          sx={{
            mb: 10,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Have questions or want to discuss a project? Reach out to us through
            any of these channels.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ justifyContent: "center", mb: 10 }}>
          {/* Left side with contact info */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                height: "100%",
                width: "700px",
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ marginBottom: "2rem" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Contact illustration"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      maxHeight: 300,
                      borderRadius: 16,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                </motion.div>

                <Box sx={{ width: "100%" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Contact Information
                  </Typography>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EmailIcon color="primary" sx={{ mr: 2 }} />
                      <Typography>fm0850020@gmail.com</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PhoneIcon color="primary" sx={{ mr: 2 }} />
                      <Typography>+123 456 7890</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationIcon color="primary" sx={{ mr: 2 }} />
                      <Typography>
                        123 Innovation Drive, Tech City, TC 10001
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Box>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Follow Us
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      <IconButton
                        color="primary"
                        href="https://linkedin.com"
                        target="_blank"
                        sx={{
                          bgcolor: "primary.light",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href="https://facebook.com"
                        target="_blank"
                        sx={{
                          bgcolor: "primary.light",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <FacebookIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href="https://twitter.com"
                        target="_blank"
                        sx={{
                          bgcolor: "primary.light",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <TwitterIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href="https://instagram.com"
                        target="_blank"
                        sx={{
                          bgcolor: "primary.light",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <InstagramIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href="https://github.com"
                        target="_blank"
                        sx={{
                          bgcolor: "primary.light",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right side with contact form */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 700, mb: 4 }}
              >
                Send Us a Message
              </Typography>

              <Fade in={submitStatus.message !== ""}>
                <Box sx={{ mb: 3 }}>
                  <Alert
                    severity={submitStatus.success ? "success" : "error"}
                    sx={{ borderRadius: 2 }}
                  >
                    {submitStatus.message}
                  </Alert>
                </Box>
              </Fade>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <TextField
                  required
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={isSubmitting ? null : <SendIcon />}
                  disabled={isSubmitting}
                  sx={{
                    alignSelf: "flex-start",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress
                        size={24}
                        sx={{ color: "white", mr: 1 }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(to right, #e0e5ec, #f5f7fa)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: "text.primary",
            }}
          >
            What Our Clients Say
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < testimonial.rating ? "primary" : "disabled"}
                        fontSize="small"
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontStyle: "italic" }}
                  >
                    "{testimonial.content}"
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mt: "auto" }}
                  >
                    <Avatar
                      alt={testimonial.name}
                      src={testimonial.avatar}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: "text.primary",
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                sx={{
                  "&:before": { display: "none" },
                  "&:not(:last-child)": {
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="primary" />}
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="600">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: "white" }}>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
