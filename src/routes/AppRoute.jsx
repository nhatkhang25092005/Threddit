import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/layout/AppLayout";
import Profile from "../features/user/page/Profile";
import ChangePassword from "../features/user/page/ChangePassword";
import Notfound from "../components/common/Notfound";
import Notifications from "../features/notification/page/Notifications";
import NotificationProvider from "../provider/NotificationProvider";
import ClientPage from "../features/personal/page/ClientPage";
import Home from "../features/user/page/home";
import Search from "../features/user/page/Search";
import CreatePost from "../features/user/page/CreatePost";
export default function AppRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<NotificationProvider><AppLayout /></NotificationProvider>}>
          {/* Feature Route Here */}
          <Route path="profile" element={<Profile />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="client" element={<ClientPage/>}/>
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="add" element={<CreatePost />} />
        </Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
