import { Routes, Route, useLocation } from "react-router-dom";
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
import StoryList from "../features/post/components/story/StoryList";
import DetailPostPage from "../features/post/components/post/DetailPostPage";
import Feed from "../features/post/components/feed";
import Reel from "../features/post/components/reel/index.jsx";
import { SearchResultsPage } from "../features/post/components/search";
function AppProviders({ children }) {
  return (
    <OrchestrateProvider>
      <BlockProvider>
        <NotificationProvider>
          <FriendshipProvider>
            <PostProvider>
              {children}
            </PostProvider>
          </FriendshipProvider>
        </NotificationProvider>
      </BlockProvider>
    </OrchestrateProvider>
  )
}

function StoryListPage() {
  return <StoryList />
}

function DetailPostMediaPage() {
  return <DetailPostPage />
}

export default function AppRoute() {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation?.pathname
    ? location.state.backgroundLocation
    : null

  return (
    <AppProviders>
      <>
        <Routes location={backgroundLocation || location}>
          <Route>
            <Route element={<AppLayout />}>
              {/* Feature Route Here */}
              <Route path="account" element={<Account />} />
              <Route path="update_password" element={<UpdatePassword />} />
              <Route path="notification" element={<PageNotification/>} />
              {/* <Route path="client/:clientName/:postId?" element={<Profile/>}/> */}
              <Route path="profile/:username?" element={<Profile/>}/>
              <Route path="home/:postId?" element={<Feed/>} />
              <Route path="search" element={<SearchResultsPage/>} />
              <Route path="reel" element={<Reel/>}/>
            </Route>
          </Route>
          <Route
            path="stories/:source/:username?/:storyId?"
            element={<StoryListPage />}
          />
          <Route
            path="post/detail/:postId/:mediaIndex?"
            element={<DetailPostMediaPage />}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>

        {backgroundLocation ? (
          <Routes>
            <Route
              path="stories/:source/:username?/:storyId?"
              element={<StoryListPage />}
            />
            <Route
              path="post/detail/:postId/:mediaIndex?"
              element={<DetailPostMediaPage />}
            />
          </Routes>
        ) : null}
      </>
    </AppProviders>
  );
}
