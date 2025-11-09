import { Typography, Box, Fade, CircularProgress,Tabs, Tab  } from "@mui/material";
import Column from "../../../components/layout/Column";
import useUserPage from "../hooks/useUserPage.js";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import ArrowButton from "../../../components/common/ArrowButton";
import CommentButton from "../../../components/common/CommentButton";
import MakerButton from "../../../components/common/MakerButton";
import ShareButton from "../../../components/common/ShareButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import {DISPLAY, ROUTES, TEXT,LABEL} from "../../../constant/"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInfiniteScroll  from "../../../hooks/useInfiniteScroll.js"
import PopupNotification from "../../../components/common/PopupNotification.jsx"
import CustomTabPanel from "../../../components/common/CustomTabPanel.jsx";
import OptionsMenu from "../../../components/common/OptionsMenu.jsx"
import usePin from "../../../hooks/usePin.js";
import SnakeBarNotification from "../../../components/common/SnakeBarNotification.jsx";
import EditableContent from "../../../components/common/EditableContent.jsx";
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import Post from "../../../components/common/Post.jsx";

function allyProps(index){
    return{
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function UserPage() {
  const {pinPost,unpinPost, resultOfPin, pinLoading} = usePin()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)
  const {
    setEditContent,
    saveEdit,
    cancelEditing,
    startEditing,
    deletePost,
    adjustSavePostAfterUnsave,
    getCreatedPost,
    getSavedPost,
    setTag,
    adjustPinStatus,
    createdPostHasMore,
    savedPostHasMore,
    loading,
    username,
    follower,
    following,
    createdPosts,
    savedPosts,
    result,
    resultOfEdit,
    editingPostId,
    editContent,
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

  // pin/unpin post menu item props
  function pinProps(item){
    return {
      label:item.isPinned ? "bỏ ghim bài viết" : "ghim bài viết", 
      icon:(pinLoading ? <CircularProgress/> : (item.isPinned ? <PushPinIcon/> : <PushPinOutlinedIcon/>)), 
      callback:()=>{
        adjustPinStatus(item.id);
        item.isPinned ? unpinPost(item.id) : pinPost(item.id)
      }}
  }

  // Result controller
  const [openSnack, setOpenSnack] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [resultMessage, setResultMessage] = useState(null)
  const [resultTitle, setResultTitle] = useState(null)
  useEffect(()=>{
    if(result?.type === DISPLAY.POPUP){ 
      setResultTitle(result?.title)
      setResultMessage(result?.message)
      setOpenPopup(true)
    }
    if(resultOfPin?.isSuccess === false){
      setResultTitle(resultOfPin?.say?.title)
      setResultMessage(resultOfPin?.say?.message)
      setOpenPopup(true)
    }
    if(resultOfEdit?.type === DISPLAY.SNACKBAR){
      console.log("Result:",resultOfEdit)
      setResultTitle(resultOfEdit?.title)
      setResultMessage(resultOfEdit?.message)

      setOpenSnack(true)
    }
  },[result, resultOfPin, resultOfEdit])

  // switch tag handler
  function handleChange(event, newValue){
    setTag(newValue)
    setValue(newValue)
  }
  return (
    <>
      <SnakeBarNotification open={openSnack} onClose={()=>setOpenSnack(false)} duration={3000} message={resultMessage}/>
      <PopupNotification open={openPopup} onClose={()=>setOpenPopup(false)} title={resultTitle} content={resultMessage}/>
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


              // công trường đang thi công ://
              ? createdPosts.map((item, index)=>
                <Post
                  item = {item}
                  index = {index}
                  createdPostsLength={createdPosts.length}
                  deletePost={deletePost}
                  startEditing = {startEditing}
                  pinProps = {pinProps}
                  editingPostId = {editingPostId}
                  editContent = {editContent} 
                  saveEdit = {saveEdit}
                  cancelEditing={cancelEditing}
                  setEditContent={setEditContent}
                  loading={loading}
                  isOwner={item.author.username === username}
                />
              )
              : <BlockContent customStyle={{display:"flex", flexDirection:"row", mx:"auto",p:"2rem"}}>
                  <Typography sx={{textAlign:"center"}}>{TEXT.NO_POST_ME}</Typography>
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
              ?  savedPosts.map((item,index ) => 
              <Post
                  item = {item}
                  index = {index}
                  createdPostsLength = {savedPosts.length}
                  deletePost = {deletePost}
                  startEditing = {startEditing}
                  pinProps = {pinProps}
                  editingPostId = {editingPostId}
                  editContent = {editContent}
                  saveEdit = {saveEdit}
                  cancelEditing = {cancelEditing}
                  setEditContent = {setEditContent}
                  loading={loading}
                  adjustSavePostAfterUnsave = {adjustSavePostAfterUnsave}
                  isOwner={item.author.username === username}
                />)
              : <BlockContent customStyle={{display:"flex", flexDirection:"row", mx:"auto",p:"2rem"}}>
                  <Typography sx={{textAlign:"center"}}>{TEXT.NO_POST_SAVED}</Typography>
                </BlockContent>
            }

             {/* observer block */}
              { <div ref={savedHasMoreRef} style={{visibility: savedPostHasMore ? "visible" : "hidden" }} /> }
              
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
