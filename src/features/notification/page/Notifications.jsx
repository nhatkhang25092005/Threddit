import { Typography, Box, CircularProgress, Fade } from "@mui/material";
import { DISPLAY, TEXT, TITLE, ROUTES } from "../../../constant";
import Column from "../../../components/layout/Column";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import useNotificationList from "../hooks/useNotificationList";
import PopupNotification from "../../../components/common/PopupNotification";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Notifications() {
  const loadMoreRef = useRef(null)
  // elements of page, using for render on screen
  const { list, error, loadMore, hasMore, loading, markAsRead } = useNotificationList();

  // Popup for display errors have type "popup"
  const [popup, setPopup] = useState(false)

  /** Navigate when user clicking on each notification
   *  redirect user to another user page (follow notification)
   */
  const navigate = useNavigate()

  // handle scroll effect, scroll down and download more notification
  useEffect(() => {
    if(!hasMore) return
    const observer = new IntersectionObserver(
      (entries)=>{
        const target = entries[0]
        if(target.isIntersecting && !loading && hasMore) loadMore()
      },
      {
        threshold : 0.1,
        rootMargin : "200px"
      }
    )

    if(loadMoreRef.current){ observer.observe(loadMoreRef.current) }
    return () => observer.disconnect()
  }, [loading, hasMore]);

  // Observation of error.type status, if it has type = POPUP, set popup to open
  useEffect(() => {if(error?.type === DISPLAY.POPUP) setPopup(true)},[error])

  return (
    <>
      {/* Popup for error from server (500) */}
      <PopupNotification open={popup} onClose={()=>setPopup(false)} title={TITLE.ERROR} content={error}/>
      <Column customStyle={{ pt: "2rem", width: "60%", mx: "auto",pb:"0",mb:"2rem" }} >
        <Typography variant="title">{TITLE.NOTIFICATION}</Typography>
        <BoxContent customStyle={{ mx: 0, px: 0, height:"fit-content",py:0,mt:2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt:"1rem" }}>

            {/* BLocks of content */}
            {list.length !== 0 ? (list.map((notification, index) => (
              <BlockContent 
                customStyle={index === list.length - 1 ? {borderBottom : "none"} : undefined}
                onClick = {()=>{
                  notification.isRead ? undefined : markAsRead(notification.id)
                  navigate(ROUTES.CLIENT_PAGE,{state:{clientName:notification.target}})
                }}
                 header={<Box sx={{ px: "1rem",pt:"0.5rem"}} textAlign={"end"}><Typography variant="sub">{notification.createdAt}</Typography></Box>}>
                <Box sx={{ px: "1rem",pb:"2rem", }}>{notification?.content}</Box>
              </BlockContent>
            )))
          :(
            <BlockContent><Typography variant="h6" sx={{textAlign:"center", pb:"1.5rem",pt:"1rem"}}>{TEXT.NO_NOTIFICATION}</Typography></BlockContent>
          ) }
            {hasMore && <div ref={loadMoreRef} style={{ height: "20px" }} /> }
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
