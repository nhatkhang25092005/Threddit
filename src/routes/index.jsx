import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.jsx";
import AppRoute from "./AppRoute.jsx";
import Notfound from "../components/common/Notfound.jsx";
import Awake from "../features/Awake.jsx";
import Auth from '../features/auth/Auth.jsx'
import Test from "../test/Test.jsx";
import { NotifyProvider } from "@/provider/notify/NotifyProvider.jsx";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Awake />
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
    </BrowserRouter>
  );
}
