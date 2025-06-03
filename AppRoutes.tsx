import AuthPage from "./src/pages/AuthPage";
import Profile from "./src/pages/Profile";
import ComprasPage from "./src/pages/ComprasPage";
import CarritoPage from "./src/pages/CarritoPage";
import ResponsiveAppBar from "./src/components/ResponsiveAppBar";
import {
  Route,
  Routes,

} from "react-router-dom";

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
