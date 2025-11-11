import { Typography, Box, Fade, CircularProgress, Tabs, Tab } from "@mui/material";
import Column from "../../../components/layout/Column";
import useUserPage from "../hooks/useUserPage.js";
import BlockContent from "../../../components/common/BlockContent";

import { DISPLAY, ROUTES, TEXT, LABEL } from "../../../constant/";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll.js";
import PopupNotification from "../../../components/common/PopupNotification.jsx";
import CustomTabPanel from "../../../components/common/CustomTabPanel.jsx";
import SnakeBarNotification from "../../../components/common/SnakeBarNotification.jsx";
import Post from "../../../components/common/Post.jsx";

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  
  const {
    handlePostUpdate,
    handlePostResult,
    adjustSavePostAfterUnsave,
    getCreatedPost,
    getSavedPost,
    setTag,
    createdPostHasMore,
    savedPostHasMore,
    loading,
    username,
    follower,
    following,
    createdPosts,
    savedPosts,
    result,
  } = useUserPage();

  const createdHasMoreRef = useInfiniteScroll({
    hasMore: createdPostHasMore,
    loading,
    onLoadMore: getCreatedPost,
  });

  const savedHasMoreRef = useInfiniteScroll({
    hasMore: savedPostHasMore,
    loading,
    onLoadMore: getSavedPost
  });

  // Result controller
  const [openSnack, setOpenSnack] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [resultTitle, setResultTitle] = useState(null);

  // Handle result from useUserPage hook
  useEffect(() => {
    if (result) {
      setResultMessage(result.message);
      setResultTitle(result.title);
      
      if (result.type === DISPLAY.SNACKBAR) {
        setOpenSnack(true);
      } else if (result.type === DISPLAY.POPUP) {
        setOpenPopup(true);
      }
    }
  }, [result]);


  // switch tag handler
  function handleChange(event, newValue) {
    setTag(newValue);
    setValue(newValue);
  }

  return (
    <>
      <SnakeBarNotification 
        open={openSnack} 
        onClose={() => setOpenSnack(false)} 
        duration={3000} 
        message={resultMessage} 
      />
      <PopupNotification 
        open={openPopup} 
        onClose={() => setOpenPopup(false)} 
        title={resultTitle} 
        content={resultMessage} 
      />
      
      <Column customStyle={{ pt: "1rem", width: "60%", mx: "auto", mb: "3rem" }}>
        <Typography variant="h6" fontWeight={"bold"}>{username}</Typography>
        
        {/* client information */}
        <Box sx={{ height: "fit-content", py: "0",pl:"1rem", mb: "2rem", width:"100%"}}>
          <Box sx={{ display: "flex", flexDirection: "row", ml:"0"}}>
            <Box flex={1} sx={{ display: "flex", flexDirection: "column" }}>

              {/* username block */}
              <Typography variant="h5" fontWeight={"bold"}>{username}</Typography>

              {/* follow number block */}
              <Box 
                onClick={() => navigate(ROUTES.FOLLOW_LIST, { state: { target: "me" } })} 
                display={"flex"} 
                flexDirection={"column"} 
                sx={{ 
                  cursor: "pointer", 
                  width: "fit-content", 
                  '&:hover': { '& .MuiTypography-root': { textDecoration: 'underline' } } 
                }} 
              >
                <Typography sx={{ ml: "10px" }} variant="sub">{following + " Người đang theo dõi"}</Typography>
                <Typography sx={{ ml: "10px" }} variant="sub">{follower + " Người theo dõi"}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Post contents */}
        <Box
          sx={{
            border: "solid white 1px",
            borderRadius: "10px",
            overflow: "hidden",
            width: "100%"
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              width: "100%",
              px: "0",
              display: "flex",
              flexDirection: "row",
              borderRadiusTopLeft: "10px",
              borderRadiusTopRight: "10px",
              bgcolor: "#dcdcdc0d",
              "& .MuiTab-root": { color: "#BCBDBF !important" },
              "& .Mui-selected": { bgcolor: "#0A0B0B", color: "white !important" },
              "& .MuiTabs-indicator ": { bgcolor: "white", }
            }}>
            <Tab label={LABEL.CREATED_POSTS} {...allyProps(0)} sx={{ flex: 1, maxWidth: "none" }} />
            <Tab label={LABEL.SAVED_POSTS} {...allyProps(1)} sx={{ flex: 1, maxWidth: "none" }} />
          </Tabs>

          {/* user's created posts block */}
          <CustomTabPanel value={value} index={0}>
            {
              createdPosts.length !== 0
                ? createdPosts.map((post, index) =>
                  <Post
                    key={post.id}
                    item={post}
                    index={index}
                    createdPostsLength={createdPosts.length}
                    onPostUpdatedRendering={handlePostUpdate}
                    onResult={handlePostResult}
                    isOwner={true}
                  />
                )
                : <BlockContent customStyle={{ display: "flex", flexDirection: "row", mx: "auto", p: "2rem" }}>
                  <Typography sx={{ textAlign: "center" }}>{TEXT.NO_POST_ME}</Typography>
                </BlockContent>
            }

            {/* observer block */}
            <div ref={createdHasMoreRef} style={{ height: "20px", visibility: createdPostHasMore ? "visible" : "hidden" }} />

            {/* Loading block */}
            <Fade in={loading} unmountOnExit>
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress />
              </Box>
            </Fade>
          </CustomTabPanel>

          {/* user's saved post */}
          <CustomTabPanel value={value} index={1}>
            {
              savedPosts.length !== 0
                ? savedPosts.map((post, index) =>
                  <Post
                    key={post.id}
                    item={post}
                    index={index}
                    createdPostsLength={savedPosts.length}
                    onPostUpdatedRendering={handlePostUpdate}
                    onResult={handlePostResult}
                    adjustSavePostAfterUnsave={adjustSavePostAfterUnsave}
                    isOwner={post.author.username === username}
                  />)
                : <BlockContent customStyle={{ display: "flex", flexDirection: "row", mx: "auto", p: "2rem" }}>
                  <Typography sx={{ textAlign: "center" }}>{TEXT.NO_POST_SAVED}</Typography>
                </BlockContent>
            }

            {/* observer block */}
            <div ref={savedHasMoreRef} style={{ visibility: savedPostHasMore ? "visible" : "hidden" }} />

            {/* Loading block */}
            <Fade in={loading} unmountOnExit>
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress />
              </Box>
            </Fade>
          </CustomTabPanel>
        </Box>
      </Column>
    </>
  );
}