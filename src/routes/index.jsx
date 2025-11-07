import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.jsx";
import AppRoute from "./AppRoute.jsx";
import Notfound from "../components/common/Notfound.jsx";
import Awake from "../features/Awake.jsx";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Awake />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/app/home" replace />} />

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
