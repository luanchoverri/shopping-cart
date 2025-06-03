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
        Descubre Productos Increíbles
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        mt={2}
        sx={{ maxWidth: 600, mx: "auto" }}
      >
        Explora nuestra colección cuidadosamente seleccionada de productos
        premium diseñados para mejorar tu estilo de vida
      </Typography>
    </Box>
  );
}
