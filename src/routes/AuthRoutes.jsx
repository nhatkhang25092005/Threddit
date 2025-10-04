import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Notfound from "../components/common/Notfound";
import Register from "../features/auth/pages/Register";
import Forgot from "../features/auth/pages/Forgot";
import Verify from "../features/auth/pages/Verify";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> 
      <Route path="forgot" element={<Forgot />} /> 
      <Route path="verify" element={<Verify />} /> 

      
      {/* Not found */}
      <Route path="*" element={<Notfound/>}/>
    </Routes>
  );
}
