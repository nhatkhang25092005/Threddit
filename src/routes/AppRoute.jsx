import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/Main/AppLayout";
import Account from "../features/account/info/Account.jsx";
import Notfound from "../components/common/Notfound";
import NotificationProvider from "../features/notification/provider/NotificationProvider.jsx";
import Home from "../features/home/page/Home.jsx";
import { PostProvider } from "../provider/PostProvider.jsx";
import UpdatePassword from '../features/account/updatepassword/UpdatePassword.jsx'
import Profile from "../features/profile/Profile.jsx";
import PageNotification from "../features/notification/PageNotification.jsx";

export default function AppRoute() {
  return (
    <Routes>
      <Route>
        <Route element={<NotificationProvider><PostProvider><AppLayout /></PostProvider></NotificationProvider>}>
          {/* Feature Route Here */}
          <Route path="account" element={<Account />} />
          <Route path="update_password" element={<UpdatePassword />} />
          <Route path="notification" element={<PageNotification/>} />
          <Route path="client/:clientName/:postId?" element={<Profile/>}/>
          <Route path="profile/:username?" element={<Profile/>}/>
          <Route path="home/:postId?" element={<Home />} />
        </Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
