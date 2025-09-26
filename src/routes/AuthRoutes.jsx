import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Notfound from "../components/common/Notfound";
// import Register from "../features/auth/pages/register";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      {/* <Route path="register" element={<Register />} />  */}
      
      {/* Not found */}
      <Route path="*" element={<Notfound/>}/>
    </Routes>
  );
}
