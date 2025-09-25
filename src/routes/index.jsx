import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.jsx";
import AppRoute from "./AppRoute.jsx";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        
        {/* Main App Route */}
        <Route path="/*" element={<AppRoute />} />
        
      </Routes>
    </BrowserRouter>
  );
}
