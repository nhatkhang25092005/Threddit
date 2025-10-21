import { Typography, Box, Button } from "@mui/material";
import Column from "../../../components/layout/Column";
import useClientPage from "../hooks/useClientPage";
import BoxContent from "../../../components/common/BoxContent";
import BlockContent from "../../../components/common/BlockContent";
import ArrowButton from "../../../components/common/ArrowButton";
import CommentButton from "../../../components/common/CommentButton";
import MakerButton from "../../../components/common/MakerButton";
import ShareButton from "../../../components/common/ShareButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {TEXT, DISPLAY} from "../../../constant/"
export default function ClientPage() {
  const {loading, clientName, error,follower, following, posts, follow, postFollow, postUnFollow} = useClientPage()

  return (
    <>
      <Column customStyle={{ pt: "1rem", width:"60%", mx:"auto" }}>
        <Typography variant="h6" fontWeight={"bold"}>{clientName}</Typography>

        {/* client information */}
        <BoxContent  customStyle={{height:"fit-content", py:"0", border:"none", mb:"2rem"}}>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <Box flex={1} sx={{display:"flex", flexDirection:"column"}}>
                  <Typography variant="h5" fontWeight={"bold"}>{clientName}</Typography>
                  <Typography sx={{ml:"10px"}} variant="sub">{following + " Người đang theo dõi"}</Typography>
                  <Typography sx={{ml:"10px"}} variant="sub">{follower + " Người theo dõi"}</Typography>
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
          {posts.map((item,index )=>(
            <BlockContent
              customStyle={index === posts.length - 1 ? {borderBottom : "none"} : undefined}

              header={<Box sx={{display:"flex", flexDirection:"row", justifyItems:"start",pb:"0px", gap:"1rem", alignItems:"center", mb:"1rem" }}>
                  <Typography variant="h6" fontWeight={"bold"}>{clientName}</Typography>
                  <Typography variant="sub" > {item.createdAt}</Typography>
                  <MoreHorizIcon sx={{ml:"auto"}}/>
              </Box>}
              
              footer={<Box sx={{display:"flex", flexDirection:"row", gap:"1rem", justifyItems:"start"}}>
                  <ArrowButton data={"999+"} sx={{width:"130px"}}/>
                  <CommentButton data={"999+"} sx={{width:"130px"}}/>
                  <MakerButton data={"999+"} sx={{width:"130px"}}/>
                  <ShareButton/>
              </Box>}
            >
             {item.content} 
            </BlockContent>
          ))}
        </BoxContent>
      </Column>
    </>
  );
}
