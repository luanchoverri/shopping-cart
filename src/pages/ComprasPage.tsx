import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

import type { Product } from "../types/product";
import HeroText from "../components/HeroText";
import toast from "react-hot-toast";

function ComprasPage() {
  const { products } = useProducts(); // asi es como accedo al array
  const { addToCart, items } = useCart();

  const checkIsProductInCart = (productId: number): boolean => {
    return items.some((item) => item.id === productId);
  };

  const handleAdd = (product: Product): void => {
    addToCart(product);
    toast.success( "Succesful Purchase, thank you for your purchase!", {duration:3000, position:"top-center"} )
  };

  if (!products) {
    return (
      <Container
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={32} color="primary" />
        <span style={{ marginLeft: 12 }}>Loading...</span>
      </Container>
    );
  }


  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          mt: 0,
          pt: 6,
          pb: { xs: 4, sm: 8 },
          px: { xs: 0, sm: 5, md:10 }, // padding horizontal: 0 en mobile, 5 (40px) desde sm en adelante
        }}
      >
        <HeroText></HeroText>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 5, md: 12 }}
        >
          {products.map((p: Product) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
              <ProductCard
                product={p}
                handleAgregar={() => handleAdd(p)}
                isAdded={checkIsProductInCart(p.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ComprasPage;
