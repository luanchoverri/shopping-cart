import AuthPage from "./src/pages/AuthPage";
import Profile from "./src/pages/Profile";
import ComprasPage from "./src/pages/ComprasPage";
import CarritoPage from "./src/pages/CarritoPage";
import ResponsiveAppBar from "./src/components/ResponsiveAppBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import EmptyCart from "./src/pages/EmptyCart";
import { Toaster } from "react-hot-toast";

function AppRoutes() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<ComprasPage />} />
        <Route path="carrito" element={<CarritoPage />} />
      </Routes>
     
    </>
  );
}
export default AppRoutes;
