import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Notfound from "../components/common/Notfound";
import Register from "../features/auth/pages/Register";
import Forgot from "../features/auth/pages/Forgot";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> 
      <Route path="forgot" element={<Forgot />} /> 
      
      {/* Not found */}
      <Route path="*" element={<Notfound/>}/>
    </Routes>
  );
}
