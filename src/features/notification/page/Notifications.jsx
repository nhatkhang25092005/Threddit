import { Typography, Box, CircularProgress, Fade, Button } from "@mui/material";
import { DISPLAY, TEXT, TITLE, ROUTES } from "../../../constant";
import Column from "../../../components/layout/Column";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import useNotificationList from "../hooks/useNotificationList";
import PopupNotification from "../../../components/common/PopupNotification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll"
export default function Notifications() {
  // elements of page, using for render on screen
  const { list, error, loadMore, hasMore, loading, markAsRead } = useNotificationList();

  // Popup for display errors have type "popup"
  const [popup, setPopup] = useState(false)

  /** Navigate when user clicking on each notification
   *  redirect user to another user page (follow notification)
   */
  const navigate = useNavigate()

  // handle scroll effect, scroll down and download more notification
  const loadMoreRef = useInfiniteScroll({hasMore, loading, onLoadMore: loadMore})

  // Observation of error.type status, if it has type = POPUP, set popup to open
  useEffect(() => {if(error?.type === DISPLAY.POPUP) setPopup(true)},[error])

  return (
    <>
      {/* Popup for error from server (500) */}
      <PopupNotification open={popup} onClose={()=>setPopup(false)} title={TITLE.ERROR} content={error}/>
      <Column customStyle={{ pt: "2rem", width: "60%", mx: "auto",pb:"0", position:"relative"}} >
        <Typography variant="title">{TITLE.NOTIFICATION}</Typography>
        <BoxContent customStyle={{ mx: 0, px: 0, height:"fit-content",py:0,mt:2,mb:"5rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>

            {/* BLocks of content */}
            {list.length !== 0 ? (list.map((notification, index) => (
              <BlockContent 
                key={index}
                customStyle={{
                  ...(notification.isRead === true ? undefined :{bgcolor: "#cdcdcd24"}),
                  ...index === list.length - 1 ? undefined: {borderBottom:"solid #BCBDBF 1px"} ,
                  cursor:"pointer",
                  "&:hover":{
                    bgcolor:"#f0f0f012",
                  },
                  "&:hover .markAsRead":{visibility:"visible"},
                  "&:hover .newNotification":{visibility:"hidden"},
                }}
                onClick = {()=>{
                  if (!notification.isRead) markAsRead(notification.id)
                  console.log(notification.target.postId)
                  if(typeof notification.target === "object") navigate(`${ROUTES.HOME}/${notification.target.postId}`)
                  else if(isNaN(notification.target)) navigate(`${ROUTES.CLIENT_PAGE}/${notification.target}`)
                  else navigate(`${ROUTES.HOME}/${notification.target}`)
                }}
                header={
                  <Box sx={{ px: "1rem",pt:"0.5rem", height:'1.5rem'}}/>}
                footer = {
                  <Box sx={{display:"flex", pb:"1rem", flexDirection:"row", px:"1rem",alignItems:"center", justifyContent:"space-between"}}>
                    <Typography variant="sub" sx={{pl:"0.5rem"}}>{notification.createdAt}</Typography>
                    {!notification.isRead 
                    ? <Typography className="newNotification" sx={{color:"#43ff2bff", visibility:"visible", position:'absolute', right:"1.5rem"}}>{TEXT.NOT_READ}</Typography>
                    : <Typography sx={{color:"#9898989e"}}>{TEXT.READ}</Typography>}
                    {!notification.isRead && <Button onClick={(e)=>{e.stopPropagation();markAsRead(notification.id)}} variant="contained" className="markAsRead" sx={{visibility:"hidden",height:"fit-content" ,border:"solid #ffffff60 1px", fontSize:"12px", bgcolor:"#ffffffff"}}>{TEXT.MARK_AS_READ}</Button>}
                  </Box>
                }  
                >
                  <Box sx={{ px: "1rem",pb:"1rem",pt:"0.3rem" }}>{notification?.content}</Box>
              </BlockContent>
            )))
          :(
            <BlockContent><Typography variant="h6" sx={{textAlign:"center", pb:"1.5rem",pt:"1rem"}}>{TEXT.NO_NOTIFICATION}</Typography></BlockContent>
          ) }
            <div ref={loadMoreRef} style={{visibility: hasMore ? "visible" : "hidden" }} /> 
            {/* Loading block */}
            <Fade in={loading} unmountOnExit>
              <Box sx={{display:"flex",justifyContent:"center",py:2}}>
                <CircularProgress />
              </Box>
            </Fade>
          </Box>
        </BoxContent>
      </Column>
    </>
  );
}
