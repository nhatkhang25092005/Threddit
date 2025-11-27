import {DISPLAY, TEXT, LABEL, ROUTES} from "../../../constant"
import { Box, Typography, CircularProgress, Tab, Tabs, Fade } from "@mui/material";
import Column from "../../../components/layout/Column";
import useHome from "../../home/hooks/useHome";
import BlockContent from "../../../components/common/BlockContent";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import CustomTabPanel from "../../../components/common/CustomTabPanel"
import PopupNotification from "../../../components/common/PopupNotification"
import Post from "../../../components/common/Post"
import { useParams } from "react-router-dom";
import PostDetail from "../../post/page/PostDetail";
import { useNavigate } from "react-router-dom";

function allyProps(index) {
  return {  
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function Home() {
  const [value, setValue] = useState(0);
  const {postId} = useParams()
  const navigate = useNavigate()
  const {
    posts,
    setTag,
    getFeed,
    updateRender,
    followingPosts,
    result,
    getFollowingPosts,
    followingHasMore,
    feedHasMore,
    loadingForFeed,
    loadingForFollow
  } = useHome();

  // Scroll controller
  const loadMoreRef = useInfiniteScroll({
    hasMore: feedHasMore,
    loading : loadingForFeed,
    onLoadMore : getFeed
  })
  const followingMoreRef = useInfiniteScroll({
    hasMore:followingHasMore,
    loading: loadingForFollow,
    onLoadMore:getFollowingPosts
  })

  function handleChange(event, newValue) {
    setTag(newValue);
    setValue(newValue);
  }

  const [open, setOpen] = useState(false)
  useEffect(()=>{if(result?.type === DISPLAY.POPUP) setOpen(true)},[result])
  
  const [openDetail, setOpenDetail] = useState(false)
  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{if(postId) setOpenDetail(true)},[]) 
  return (
    <>
      {openDetail && <PostDetail onOpen={openDetail} onClose={()=>{
        setOpenDetail(false)
        navigate("..", { replace: true, relative: "path" });
      }}/>}
      <PopupNotification open={open} onClose={()=>setOpen(false)} content={result?.message} title={result?.title} />
      <Column customStyle={{ pt: "0rem" }}>
        <Typography variant="title">Threddit</Typography>

        <Box
          sx={{
            width: "70%",
            mx: "auto",
            border: "1px solid #ffffffff",
            borderRadius: "12px",
            overflow: "hidden",
            mb:"5rem",
            mt: "3rem"
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderRadiusTopLeft: "10px",
              borderRadiusTopRight: "10px",
              bgcolor: "#dcdcdc0d",
              "& .MuiTab-root": { color: "#BCBDBF !important" },
              "& .Mui-selected": { bgcolor: "#0A0B0B", color: "white !important" },
              "& .MuiTabs-indicator ": { bgcolor: "white", }
            }}>
            <Tab label={LABEL.FEED} {...allyProps(0)} sx={{ flex: 1, maxWidth: "none" }} />
            <Tab label={LABEL.FOLLOWING_POSTS} {...allyProps(1)} sx={{ flex: 1, maxWidth: "none" }} />
          </Tabs>

            {/* Feed */}
          <CustomTabPanel value={value} index={0}>
            {
              posts.length !== 0
              ? posts.map((post, index) => (
                <Post
                  showPin = {false}
                  location={ROUTES.HOME}
                  onNavigate
                  key={`feed_${post.id}`}
                  isOwner={false}
                  item={post}
                  index={index}
                  createdPostsLength={posts.length}
                  onPostUpdatedRendering={updateRender}
                />))
              : <BlockContent customStyle={{ display: "flex", flexDirection: "row", mx: "auto", p: "2rem" }}>
                  <Typography sx={{ textAlign: "center" }}>{TEXT.NO_FEED}</Typography>
                </BlockContent>
            }
             {/* observer block */}
            <div ref={loadMoreRef} style={{ height: "20px", visibility: feedHasMore ? "visible" : "hidden" }} />

            {/* Loading block */}
            <Fade in={loadingForFeed} unmountOnExit>
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress  sx={{color:"white"}} size={30}  />
              </Box>
            </Fade>
          </CustomTabPanel>

            {/* Following Posts */}
            <CustomTabPanel value={value} index={1}>
            {
              followingPosts.length !== 0 
              ? followingPosts.map((post, index)=>(
                <Post
                  location={ROUTES.HOME}
                  onNavigate
                  key={`following_${post.id}`}
                  isOwner={false}
                  item={post}
                  index={index}
                  createdPostsLength={followingPosts.length}
                  onPostUpdatedRendering={updateRender}
                />
              ))
              :
                <BlockContent customStyle={{ display: "flex", flexDirection: "row", mx: "auto", p: "2rem" }}>
                  <Typography sx={{ textAlign: "center" }}>{TEXT.NO_FOLLOWING_POSTS}</Typography>
                </BlockContent>
            }
            <div ref={followingMoreRef} style={{ height: "20px", visibility: followingHasMore ? "visible" : "hidden" }} />

            {/* Loading block */}
            <Fade in={loadingForFollow} unmountOnExit>
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress sx={{color:"white"}} size={30} />
              </Box>
            </Fade>
            </CustomTabPanel>
        </Box>
      </Column>
    </>
  );
}