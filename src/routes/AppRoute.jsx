import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/layout/AppLayout";
import Profile from "../features/user/page/Profile";
import ChangePassword from "../features/user/page/ChangePassword";
import Notfound from "../components/common/Notfound";
import Notifications from "../features/notification/page/Notifications";
import NotificationProvider from "../provider/NotificationProvider";
export default function AppRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<NotificationProvider><AppLayout /></NotificationProvider>}>
          {/* Feature Route Here */}
          <Route path="profile" element={<Profile />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="notification" element={<Notifications />} />
        </Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
