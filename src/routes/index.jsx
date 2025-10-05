import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.jsx";
import AppRoute from "./AppRoute.jsx";
import Notfound from "../components/common/Notfound.jsx";
import Awake from "../features/awake.jsx";
import Authorize from "../middleware/Authorize.jsx";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Awake />
      <Authorize/>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* Auth Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Main App Route */}
        <Route path="/app/*" element={<AppRoute />} />

        {/* Not Found */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}
