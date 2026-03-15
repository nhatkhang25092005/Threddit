import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppRoute from "./AppRoute.jsx";
import Notfound from "../components/common/Notfound.jsx";
import Auth from '../features/auth/Auth.jsx'
import Test from "../test/Test.jsx";
import { NotifyProvider } from "@/provider/notify/NotifyProvider.jsx";
import { AuthProvider } from "../core/auth/AuthProvider.jsx";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotifyProvider>
              <Routes >
                {/* Default route */}
                <Route path="/" element={<Navigate to="/app/home" replace />} />
              
                {/* Auth Routes */}
                <Route path="/auth" element={<Auth />} />
              
                {/* Main App Route */}
                <Route path="/app/*" element={<AppRoute />} />
              
                {/* Not Found */}
                <Route path="*" element={<Notfound />} />
              
                <Route path='/test' element = {<Test/>}/>
              </Routes>
        </NotifyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
