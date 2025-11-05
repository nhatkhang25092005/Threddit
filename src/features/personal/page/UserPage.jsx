import { Typography, Box, Fade, CircularProgress,Tabs, Tab  } from "@mui/material";
import Column from "../../../components/layout/Column";
import useUserPage from "../hooks/useUserPage.js";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import ArrowButton from "../../../components/common/ArrowButton";
import CommentButton from "../../../components/common/CommentButton";
import MakerButton from "../../../components/common/MakerButton";
import ShareButton from "../../../components/common/ShareButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {DISPLAY, ROUTES, TEXT,LABEL} from "../../../constant/"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInfiniteScroll  from "../../../hooks/useInfiniteScroll.js"
import PopupNotification from "../../../components/common/PopupNotification.jsx"
import CustomTabPanel from "../../../components/common/CustomTabPanel.jsx";
import ThreeDotMenu from "../../../components/common/ThreeDotMenu.jsx"

function allyProps(index){
    return{
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function UserPage() {
  const navigate = useNavigate()
  const [value, setValue] = useState(0)
  const {
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
    error,
    } = useUserPage()

  const createdHasMoreRef = useInfiniteScroll({
    hasMore : createdPostHasMore,
    loading,
    onLoadMore : getCreatedPost,
  })

  const savedHasMoreRef = useInfiniteScroll({
    hasMore : savedPostHasMore,
    loading,
    onLoadMore : getSavedPost
  })

  // Popup error (if occurs)
  const [open, setOpen] = useState(false)
  useEffect(()=>{if(error?.type === DISPLAY.POPUP) setOpen(true)},[error])

  // switch tag handler
  function handleChange(event, newValue){
    setTag(newValue)
    setValue(newValue)
  }
  return (
    <>
      <PopupNotification open={open} onClose={()=>setOpen(false)} title={error?.title} content={error?.message}/>
      <Column customStyle={{ pt: "1rem", width:"60%", mx:"auto", mb:"3rem" }}>
        <Typography variant="h6" fontWeight={"bold"}>{username}</Typography>
        
        {/* client information */}
        <BoxContent  customStyle={{height:"fit-content", py:"0", border:"none", mb:"2rem"}}>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <Box flex={1} sx={{display:"flex", flexDirection:"column"}}>

                  {/* username block */}
                  <Typography variant="h5" fontWeight={"bold"}>{username}</Typography>

                  {/* follow number block */}
                  <Box onClick={()=>navigate(ROUTES.FOLLOW_LIST,{state:{target:"me"}})} display={"flex"} flexDirection={"column"} sx={{cursor:"pointer",width:"fit-content",'&:hover':{'& .MuiTypography-root': {textDecoration: 'underline'}}}} >
                    <Typography sx={{ml:"10px"}} variant="sub">{following + " Người đang theo dõi"}</Typography>
                    <Typography sx={{ml:"10px"}} variant="sub">{follower + " Người theo dõi"}</Typography>
                  </Box>
                </Box>
            </Box>
        </BoxContent> 

        {/* Post contents */}
        <Box   
          sx={{
            border:"solid white 1px",    
            borderRadius:"10px",
            overflow:"hidden",
            width:"100%"
          }}
        >
          <Tabs 
            value={value} 
            onChange={handleChange} 
            sx={{
                width:"100%",
                px:"0",
                display:"flex",
                flexDirection:"row",
                borderRadiusTopLeft:"10px",
                borderRadiusTopRight:"10px",
                bgcolor:"#dcdcdc0d",
                "& .MuiTab-root":{color:"#BCBDBF !important"},
                "& .Mui-selected":{bgcolor:"#0A0B0B",color:"white !important"},
                "& .MuiTabs-indicator ":{bgcolor:"white",}
                }}>
            <Tab label={LABEL.CREATED_POSTS} {...allyProps(0)} sx={{flex:1, maxWidth:"none"}}/>
            <Tab label={LABEL.SAVED_POSTS} {...allyProps(1)} sx={{flex:1, maxWidth:"none"}}/>
          </Tabs>

          {/* user's created posts block */}
          <CustomTabPanel value={value} index={0}>
            {
              createdPosts.length !== 0
              ? createdPosts.map((item,index )=>(
                <BlockContent
                  customStyle={{
                      px:"1rem",
                      ...index === createdPosts.length - 1 ? {borderBottom : "none"} : undefined
                  }}

                  // Header of content block
                  header={<Box sx={{display:"flex", flexDirection:"row", justifyItems:"start",pb:"0px", gap:"1rem", alignItems:"center", mb:"1rem", py:"1rem",mx:"1rem" }}>
                      <Typography variant="h6" fontWeight={"bold"}>{username}</Typography>
                      <Typography variant="sub" > {item.createdAt}</Typography>
                      <ThreeDotMenu functionList={[
                        {label:"save",callback:null}
                      ]} sx={{ ml:"delete"}}/>
                  </Box>}
                  
                  // Footer of content block
                  footer={<Box sx={{display:"flex", flexDirection:"row", gap:"1rem", justifyItems:"start",mx:"1rem"}}>
                      <ArrowButton data={item.upvoteNumber} sx={{width:"130px"}}/>
                      <CommentButton data={item.mentionedUser.length} sx={{width:"130px"}}/>
                      <MakerButton  data={item.saveNumber} sx={{width:"130px"}} marked={item.isSave ? true : false} postId={item.id}/>
                      <ShareButton/>
                  </Box>}

                  footerStyle={{
                    py:"1rem",
                    mb:"1rem",
                    ...index === createdPosts.length - 1 ? {mb:"0",borderBottom:"None"} : {borderBottom:"solid #BCBDBF 1px"}
                  }}
                >
                {item.content} 
                </BlockContent>))
              : <BlockContent customStyle={{display:"flex", flexDirection:"row", mx:"auto",p:"2rem"}}>
                  <Typography>{TEXT.NO_POST_ME}</Typography>
                </BlockContent>
            }

             {/* observer block */}
              {<div ref={createdHasMoreRef} style={{ height: "20px",visibility: createdPostHasMore ? "visible" : "hidden" }} /> }
              
              {/* Loading block */}
              <Fade in={loading} unmountOnExit>
                <Box sx={{display:"flex",justifyContent:"center",py:2}}>
                  <CircularProgress />
                </Box>
              </Fade>
          </CustomTabPanel>

          {/* user's saved post */}
          <CustomTabPanel value = {value} index={1}>
            {
              savedPosts.length !== 0
              ?  savedPosts.map((item,index )=>(
                <BlockContent
                  customStyle={index === savedPosts.length - 1 ? {borderBottom : "none"} : undefined}

                  // Header of content block
                  header={<Box sx={{display:"flex", flexDirection:"row", justifyItems:"start",pb:"0px", gap:"1rem", alignItems:"center", mb:"1rem", py:"1rem" }}>
                      <Typography variant="h6" fontWeight={"bold"}>{username}</Typography>
                      <Typography variant="sub" > {item.createdAt}</Typography>
                      <MoreHorizIcon sx={{ml:"auto"}}/>
                  </Box>}
                  
                  // Footer of content block
                  footer={<Box sx={{display:"flex", flexDirection:"row", gap:"1rem", justifyItems:"start"}}>
                      <ArrowButton data={item.upvoteNumber} sx={{width:"130px"}}/>
                      <CommentButton data={item.commentNumber} sx={{width:"130px"}}/>
                      <MakerButton data={item.saveNumber} sx={{width:"130px"}}/>
                      <ShareButton/>
                  </Box>}

                  footerStyle={{
                    py:"1rem",
                    mb:"1rem",
                    ...index === savedPosts.length - 1 ? {mb:"0",borderBottom:"None"} : {borderBottom:"solid #BCBDBF 1px"}
                  }}
                >
                {item.content} 
                </BlockContent>))
              : <BlockContent customStyle={{display:"flex", flexDirection:"row", mx:"auto",p:"2rem"}}>
                  <Typography>{TEXT.NO_POST_ME}</Typography>
                </BlockContent>
            }

             {/* observer block */}
              { <div ref={savedHasMoreRef} style={{ height: "20px",visibility: savedPostHasMore ? "visible" : "hidden" }} /> }
              
              {/* Loading block */}
              <Fade in={loading} unmountOnExit>
                <Box sx={{display:"flex",justifyContent:"center",py:2}}>
                  <CircularProgress />
                </Box>
              </Fade>
          </CustomTabPanel>
        </Box>
      </Column>
    </>
  );
}
