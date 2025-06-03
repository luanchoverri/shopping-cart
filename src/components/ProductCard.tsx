import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import type { Product } from "../types/product";
import { primaryGradient } from "../styles/gradient";
import IncrementDecrementButton from "./IncrementDecrementButton";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
  handleAgregar: () => void;
  isAdded: boolean;
}

function ProductCard({ product, handleAgregar, isAdded }: ProductCardProps) {
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box sx={{ position: "relative", m: 2 }}>
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain",
            mb: 0,
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
      </Box>
      <Chip
        label={
          product.category.charAt(0).toUpperCase() + product.category.slice(1)
        }
        color="primary"
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          color: "contrast",
          fontSize: "0.70rem",
          fontWeight: 600,
        }}
      />
      <CardContent sx={{ pl: 3, pr: 3, mt: 0, pt: 0 }}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </Typography>

        <Typography variant="subtitle2" className="two-line-ellipsis">
          {product.description}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            marginTop: 2,
            fontWeight: 600,
          }}
        >
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Box
          sx={{
            width: "100%",
            marginBottom: 2,
            marginLeft: 1,
            marginRight: 1,
            borderRadius: 8,
            justifyItems: " center",
          }}
        >
          {!isAdded ? (
            <Button
              className="btn-gradient"
              fullWidth
              variant="contained"
              size="medium"
              onClick={handleAgregar}
              sx={{ borderRadius: 8, textTransform: "none" }}
            >
              Add To Cart
            </Button>
          ) : (
            <Box
              sx={{
                justifyItems: "center",
                border: "0.5px solid",
                borderColor: "rgba(202, 202, 202, 0.53)",
                borderRadius: 8,

                width: "100%", // para que ocupe mismo ancho que un botón
              }}
            >
              {" "}
              <IncrementDecrementButton product={product} spacingParam={5} />
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
export default ProductCard;
