import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const backgroundImages = [
  "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1820&q=80"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("slide-right");

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionDirection("slide-right");
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setTransitionDirection("slide-right");
    setCurrentImageIndex((prevIndex) => 
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setTransitionDirection("slide-left");
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        color: "white",
        py: 10,
        textAlign: "center",
        overflow: "hidden",
        minHeight: "500px",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Background image carousel */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          overflow: "hidden"
        }}
      >
        {backgroundImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.8s ease-in-out",
              transform: 
                index === currentImageIndex 
                  ? "translateX(0)" 
                  : index < currentImageIndex 
                    ? "translateX(-100%)" 
                    : "translateX(100%)",
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          />
        ))}
        
        {/* Dark overlay for better text readability */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: -1
          }}
        />
      </Box>
      
      {/* Navigation arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 20,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          zIndex: 1
        }}
      >
        <ArrowBackIos />
      </IconButton>
      
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 20,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          zIndex: 1
        }}
      >
        <ArrowForwardIos />
      </IconButton>
      
      {/* Content */}
      <Container>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
          Affordable Physiotherapy Care for Everyone in India
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mb: 4, opacity: 0.9, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
          Bringing treatment closer to you — at home, schools, offices, and
          clinics. Stay healthy. Recover faster.
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ fontSize: "1.1rem", px: 4 }}>
          Book a Free Camp
        </Button>
      </Container>
      
      {/* Indicator dots */}
      <Box sx={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        {backgroundImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setTransitionDirection(index > currentImageIndex ? "slide-right" : "slide-left");
              setCurrentImageIndex(index);
            }}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: index === currentImageIndex ? "secondary.main" : "rgba(255,255,255,0.5)",
              margin: "0 6px",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
          />
        ))}
      </Box>
    </Box>
  );
}