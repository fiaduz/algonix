import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Sponsors() {
  return (
    <Box sx={{ bgcolor: "grey.100", py: 6 }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Our Sponsors & Partners
        </Typography>
        <Typography align="center" color="text.secondary">
          Supported by schools, colleges, corporates, and healthcare brands.
        </Typography>
      </Container>
    </Box>
  );
}
