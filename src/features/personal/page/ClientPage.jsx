import { Typography, Box, Button, Fade, CircularProgress } from "@mui/material";
import Column from "../../../components/layout/Column";
import useClientPage from "../hooks/useClientPage";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import {TEXT, DISPLAY, ROUTES} from "../../../constant/"
import { useNavigate } from "react-router-dom";
import useInfiniteScroll  from "../../../hooks/useInfiniteScroll.js"
import Post from "../../../components/common/Post/Post.jsx";
export default function ClientPage() {
  const navigate = useNavigate()
  const {
    loading,
    clientName,
    error,
    follower,
    following,
    posts,
    follow,
    hasMore,
    btnLoading,
    getCreatedPost,
    handlePostResult,
    handlePostUpdate,
    postFollow,
    postUnFollow,
    } = useClientPage()

    const loadMoreRef = useInfiniteScroll({
      hasMore,
      loading,
      onLoadMore:getCreatedPost
    })

  return (
    <>
      <Column customStyle={{ pt: "1rem", width:"60%", mx:"auto", mb:"3rem" }}>
        <Typography variant="h6" fontWeight={"bold"}>{TEXT.CLIENT_PAGE}{clientName}</Typography>

        {/* client information */}
        <BoxContent  customStyle={{height:"fit-content", py:"0", border:"none", mb:"2rem"}}>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <Box flex={1} sx={{display:"flex", flexDirection:"column"}}>
                  <Typography variant="h5" fontWeight={"bold"}>{clientName}</Typography>
                  <Box onClick={()=>navigate(ROUTES.FOLLOW_LIST,{state:{target:clientName}})} display={"flex"} flexDirection={"column"} sx={{cursor:"pointer",'&:hover':{'& .MuiTypography-root': {textDecoration: 'underline'}}}} >
                    <Typography sx={{ml:"10px"}} variant="sub">{following + " Người đang theo dõi"}</Typography>
                    <Typography sx={{ml:"10px"}} variant="sub">{follower + " Người theo dõi"}</Typography>
                  </Box>
                </Box>
                <Box sx={{p:"10px",display:"flex", justifyContent:"end"}} flex={1}>
                  <Button
                    disabled = {error?.type === DISPLAY.DISABLE ? true : false} 
                    loadingPosition="start"
                    loadingIndicator={"..."}
                    loading={btnLoading}
                    onClick={follow ? postUnFollow : postFollow} 
                    variant={follow? "darker":"contained"} 
                    sx={{width:"fit-content"}}>
                      {follow ? TEXT.UNFOLLOW : TEXT.FOLLOW}
                      {error?.type === DISPLAY.DISABLE ? "Thao tac qua nhanh" : undefined}
                    </Button>
                  </Box>
            </Box>
        </BoxContent>

        {/* client's posts */}
        <BoxContent>
          {posts.length > 0
          ? posts.map((post,index)=>(
            <Post
              key={`client_${index}`}
              onNavigate
              post={post}
              config={{
                isOwner:false,
                totalPosts:posts.length,
                location:ROUTES.CLIENT_PAGE + `/${clientName}`,
                index:index
              }}
              handlers={{
                onResult:handlePostResult,
                onPostUpdate:handlePostUpdate
              }}
            />
          ))
          :
          <BlockContent customStyle={{display:"flex", flexDirection:"row", mx:"auto"}}>
            <Typography>{TEXT.NO_POST_CLIENT}</Typography>
          </BlockContent>
        }
          {hasMore && <div ref = {loadMoreRef} style = {{height:"20px"}}/>}
          <Fade in={loading} unmountOnExit>
            <Box sx={{display:"flex",justifyContent:"center",py:2}}>
              <CircularProgress />
            </Box>
          </Fade>
        </BoxContent>
      </Column>
    </>
  );
}
