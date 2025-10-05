import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/layout/AppLayout";
import Profile from "../features/user/page/Profile"
import Notfound from "../components/common/Notfound";
export default function AppRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
            {/* Feature Route Here */}
            <Route path="profile" element={<Profile/>}/>
        </Route>
      </Route>
      <Route path="*" element = {<Notfound/>}/>
    </Routes>
  );
}
