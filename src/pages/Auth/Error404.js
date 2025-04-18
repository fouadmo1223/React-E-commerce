import React, { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NotFoundIllustration = () => (
  <svg width="300" height="200" viewBox="0 0 300 200" style={{ margin: '0 auto' }}>
    <style>
      {`
        .search-man {
          animation: searchMove 3s ease-in-out infinite;
          transform-origin: center;
        }
        .search-light {
          animation: lightPulse 2s ease-in-out infinite;
        }
        .confused-face {
          animation: headShake 3s ease-in-out infinite;
        }
        @keyframes searchMove {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes lightPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        @keyframes headShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
      `}
    </style>
    
    {/* Person holding magnifying glass */}
    <g className="search-man">
      {/* Body */}
      <rect x="130" y="100" width="40" height="60" fill="#5C6BC0" rx="5" />
      
      {/* Head */}
      <circle cx="150" cy="80" r="25" fill="#FFB74D" />
      
      {/* Confused face */}
      <g className="confused-face">
        <circle cx="140" cy="75" r="3" fill="#333" />
        <circle cx="160" cy="75" r="3" fill="#333" />
        <path d="M140 90 Q150 95 160 90" stroke="#333" strokeWidth="2" fill="none" />
      </g>
      
      {/* Magnifying glass */}
      <g transform="translate(100, 60)">
        <circle cx="20" cy="20" r="15" fill="none" stroke="#333" strokeWidth="3" />
        <line x1="30" y1="30" x2="45" y2="45" stroke="#333" strokeWidth="3" />
      </g>
      
      {/* Search light */}
      <path 
        className="search-light"
        d="M80 110 L120 80 L100 60" 
        fill="rgba(255,235,59,0.3)" 
        stroke="rgba(255,235,59,0.5)" 
        strokeWidth="1"
      />
    </g>
    
    {/* Empty search results */}
    <rect x="180" y="120" width="80" height="20" fill="#EF5350" rx="3" />
    <text x="220" y="135" textAnchor="middle" fill="white" fontSize="12">No results</text>
  </svg>
);

export default function Error404() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 3
      }}
    >
      {/* 404 Text */}
      <Typography 
        variant="h1"
        data-aos="fade-down"
        sx={{ 
          fontSize: '5rem',
          fontWeight: 700,
          background: 'linear-gradient(45deg, #FF5252, #FF4081)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}
      >
        404
      </Typography>
      
      {/* Animated Illustration */}
      <Box data-aos="zoom-in" data-aos-delay="100">
        <NotFoundIllustration />
      </Box>
      
      {/* Description */}
      <Typography 
        variant="h5"
        data-aos="fade-up"
        data-aos-delay="200"
        sx={{ mt: 3, mb: 1, fontWeight: 500 }}
      >
        Oops! We couldn't find that page
      </Typography>
      <Typography 
        variant="body1"
        data-aos="fade-up"
        data-aos-delay="250"
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        The page you're looking for doesn't exist or may have been moved.
      </Typography>
      
      {/* Home Button */}
      <Button
        href="/"
        variant="contained"
        size="large"
        data-aos="fade-up"
        data-aos-delay="300"
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '1rem',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        Take Me Home
      </Button>
    </Container>
  );
}