import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/Main/AppLayout";
import Account from "../features/account/info/Account.jsx";
import Notfound from "../components/common/Notfound";
import NotificationProvider from "../features/notification/provider/NotificationProvider.jsx";
import PostProvider from "../features/post/provider/PostProvider.jsx";
import UpdatePassword from '../features/account/updatepassword/UpdatePassword.jsx'
import Profile from "../features/profile/Profile.jsx";
import PageNotification from "../features/notification/PageNotification.jsx";
import  BlockProvider from '../core/block/BlockProvider.jsx'
import OrchestrateProvider from "../core/orchestrate/OrchestrateProvider.jsx";
import FriendshipProvider from "../features/friends/FriendshipProvider.jsx";

export default function AppRoute() {
  return (
    <Routes>
      <Route>
        <Route element={
          <OrchestrateProvider>
            <BlockProvider>
              <NotificationProvider>
                <FriendshipProvider>
                  <PostProvider>
                    <AppLayout />
                  </PostProvider>
                </FriendshipProvider>
              </NotificationProvider>
            </BlockProvider>
          </OrchestrateProvider>
        }>
          {/* Feature Route Here */}
          <Route path="account" element={<Account />} />
          <Route path="update_password" element={<UpdatePassword />} />
          <Route path="notification" element={<PageNotification/>} />
          {/* <Route path="client/:clientName/:postId?" element={<Profile/>}/> */}
          <Route path="profile/:username?" element={<Profile/>}/>
          {/* <Route path="home/:postId?" element={<Home />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
