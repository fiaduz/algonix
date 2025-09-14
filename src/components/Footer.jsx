import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "black", color: "white", py: 4, mt: 4 }}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="body1">
          © {new Date().getFullYear()} Algonix. All Rights Reserved.
        </Typography>
        <Typography variant="body2">
          Contact: info@algonix.com | +91 8471984433
        </Typography>
      </Container>
    </Box>
  );
}
