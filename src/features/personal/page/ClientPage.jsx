import { Typography, Box, Button, Fade, CircularProgress } from "@mui/material";
import Column from "../../../components/layout/Column";
import useClientPage from "../hooks/useClientPage";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import ArrowButton from "../../../components/common/ArrowButton";
import CommentButton from "../../../components/common/CommentButton";
import MakerButton from "../../../components/common/MakerButton";
import ShareButton from "../../../components/common/ShareButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {TEXT, DISPLAY, ROUTES} from "../../../constant/"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PopupNotification from "../../../components/common/PopupNotification";
import useInfiniteScroll  from "../../../hooks/useInfiniteScroll.js"
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
    getCreatedPost,
    postFollow, 
    postUnFollow,
    } = useClientPage()

    const loadMoreRef = useInfiniteScroll({
      hasMore,
      loading,
      onLoadMore:getCreatedPost
    })

    const [open, setOpen] = useState(false)
    useEffect(()=>{if(error?.type === DISPLAY.POPUP) setOpen(true)},[error])

  return (
    <>
    <PopupNotification open={open} onClose={()=>setOpen(false)} title={error?.title} content={error?.message}/>
      <Column customStyle={{ pt: "1rem", width:"60%", mx:"auto", mb:"3rem" }}>
        <Typography variant="h6" fontWeight={"bold"}>{clientName}</Typography>

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
                    loading={loading} 
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
          ? posts.map((item,index )=>(
            <BlockContent
              
              header={<Box sx={{display:"flex", flexDirection:"row", justifyItems:"start",pb:"0px", gap:"1rem", alignItems:"center", mb:"1rem" }}>
                  <Typography variant="h6" fontWeight={"bold"}>{clientName}</Typography>
                  <Typography variant="sub" > {item.createdAt}</Typography>
                  <MoreHorizIcon sx={{ml:"auto"}}/>
              </Box>}
              
              footer={
              <Box sx={{
                display:"flex", 
                flexDirection:"row", 
                gap:"1rem", 
                justifyItems:"start",
              }}
              >
                <ArrowButton data={item.upvoteNumber} sx={{width:"130px"}}/>
                <CommentButton data={item.mentionedUser.length} sx={{width:"130px"}}/>
                <MakerButton data={item.saveNumber} sx={{width:"130px"}}/>
                <ShareButton/>
              </Box>}

              footerStyle={{
                py:"1rem",
                mb:"1rem",
                ...index === posts.length - 1 ? {mb:"0",borderBottom:"None"} : {borderBottom:"solid #BCBDBF 1px"}
              }}
            >
             {item.content} 
            </BlockContent>
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
