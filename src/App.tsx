import "./App.css";
import AppRoutes from "../AppRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { ProductProvider } from "./context/ProductProvider";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <AppRoutes />
              <Toaster />
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
