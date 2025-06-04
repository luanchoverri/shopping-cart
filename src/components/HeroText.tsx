import { Box, Typography } from "@mui/material";

export default function HeroText() {
  return (
    <Box textAlign="center" py={6}>
      <Typography
        variant="h3"
        fontWeight="bold"
        className="text-gradient-header"
        sx={{
          display: "inline-block",
        }}
      >
        Discover Amazing Products
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        mt={2}
        sx={{ maxWidth: 600, mx: "auto" }}
      >
        Explore our carefully curated collection of premium products designed to
        enhance your lifestyle
      </Typography>
    </Box>
  );
}
