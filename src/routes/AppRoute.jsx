import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/layout/AppLayout";
import Profile from "../features/user/page/Profile"
import ChangePassword from "../features/user/page/ChangePassword"
import Notfound from "../components/common/Notfound";
export default function AppRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
            {/* Feature Route Here */}
            <Route path="profile" element={<Profile/>}/>
            <Route path="change_password" element={<ChangePassword/>}/>
        </Route>
      </Route>
      <Route path="*" element = {<Notfound/>}/>
    </Routes>
  );
}
