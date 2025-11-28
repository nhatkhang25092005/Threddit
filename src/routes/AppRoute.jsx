import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Profile from "../features/user/page/Profile";
import ChangePassword from "../features/user/page/ChangePassword";
import Notfound from "../components/common/Notfound";
import Notifications from "../features/notification/page/Notifications";
import NotificationProvider from "../provider/NotificationProvider";
import ClientPage from "../features/personal/page/ClientPage";
import Home from "../features/home/page/Home.jsx";
import Search from "../features/user/page/Search";
import CreatePost from "../features/post/page/CreatePost";
import FollowList from "../features/user/page/FollowList";
import UserPage from "../features/personal/page/UserPage";
import { PostProvider } from "../provider/PostProvider.jsx";

export default function AppRoute() {
  return (
    <Routes>
      <Route>
        <Route element={<NotificationProvider><PostProvider><AppLayout /></PostProvider></NotificationProvider>}>
          {/* Feature Route Here */}
          <Route path="profile" element={<Profile />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="client/:clientName/:postId?" element={<ClientPage/>}/>
          <Route path="user/:postId?" element={<UserPage/>}/>
          <Route path="home/:postId?" element={<Home />} />
          <Route path="search/:postId?" element={<Search />} />
          <Route path="follow" element={<FollowList/>}/>
          <Route path="add" element={<CreatePost />} />
        </Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
