import { Typography, Box, CircularProgress, Fade } from "@mui/material";
import { DISPLAY, TEXT, TITLE } from "../../../constant";
import Column from "../../../components/layout/Column";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import useNotificationList from "../hooks/useNotificationList";
import PopupNotification from "../../../components/common/PopupNotification";
import { useEffect, useState } from "react";
export default function Notifications() {
  const { list, error, loadMore, hasMore, loading } = useNotificationList();
  const [popup, setPopup] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 
        && !loading 
        && hasMore
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);
  useEffect(() => {if(error?.type === DISPLAY.POPUP) setPopup(true)},[error])

  return (
    <>
      <PopupNotification open={popup} onClose={()=>setPopup(false)} title={TITLE.ERROR} content={error}/>
      <Column customStyle={{ pt: "2rem", width: "60%", mx: "auto",pb:"0",mb:"2rem" }} >
        <Typography variant="title">{TITLE.NOTIFICATION}</Typography>
        <BoxContent customStyle={{ mx: 0, px: 0, height:"fit-content",py:0,mt:2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt:"1rem" }}>

            {/* BLocks of content */}
            {list.length !== 0 ? (list.map((notification, index) => (
              <BlockContent customStyle={index === list.length - 1 ? {borderBottom : "none"} : undefined} key={notification.id || index} header={<Box sx={{ px: "1rem",pt:"0.5rem"}} textAlign={"end"}><Typography variant="sub">{notification.createdAt}</Typography></Box>}>
                <Box sx={{ px: "1rem",pb:"2rem", }}>{notification?.content}</Box>
              </BlockContent>
            )))
          :(
            <BlockContent><Typography variant="h6" sx={{textAlign:"center", pb:"1.5rem",pt:"1rem"}}>{TEXT.NO_NOTIFICATION}</Typography></BlockContent>
          ) }

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
