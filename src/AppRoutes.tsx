import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import ComprasPage from "./pages/ComprasPage";
import CarritoPage from "./pages/CarritoPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Route, Routes } from "react-router-dom";
import PurchaseSuccess from "./pages/PurchaseSuccess";

function AppRoutes() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<ComprasPage />} />
        <Route path="carrito" element={<CarritoPage />} />
        <Route path="carrito/success" element={<PurchaseSuccess />} />
      </Routes>
    </>
  );
}
export default AppRoutes;
