import { Routes, Route } from "react-router-dom";
import Notfound from "../components/common/Notfound";
// import Register from "../features/auth/pages/Register";
import Forgot from "../features/auth/pages/Forgot";
import Verify from "../features/auth/pages/Verify";
import VerifyForgot from "../features/auth/pages/VerifyForgot";

export default function AuthRoutes() {
  return (
    <>
      <Routes>
        {/* <Route path="register" element={<Register />} />  */}
        <Route path="forgot" element={<Forgot />} /> 
        <Route path="verify" element={<Verify />} /> 
        <Route path="verify_reset" element={<VerifyForgot />} />  
        {/* Not found */}
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </>
  );
}
