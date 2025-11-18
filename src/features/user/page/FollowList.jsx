import { useEffect, useState } from "react"
import {Box, Typography, Tab, Tabs, Button,CircularProgress, Fade } from "@mui/material"
import Column from "../../../components/layout/Column"
import {LABEL, TEXT, TITLE,DISPLAY, ROUTES} from "../../../constant"
import CustomTabPanel from "../../../components/common/CustomTabPanel"
import BlockContent from "../../../components/common/BlockContent"
import useFollowList from "../hooks/useFollowList"
import PopupNotification from "../../../components/common/PopupNotification"
import useInfiniteScroll from "../../../hooks/useInfiniteScroll"
import { useNavigate } from "react-router-dom"
function allyProps(index){
    return{
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function FollowList(){
    const navigate = useNavigate()
    // elements of follow page
    const {
        actor,
        followers, 
        followings,  
        error, 
        loading, 
        btnLoading, 
        followersHasMore,
        followingHasMore,
        setTag,
        handleFollow, 
        UnFollow,
        getFollowerList,
        getFollowingList
        } = useFollowList()
    
    // value of tab
    const [value, setValue] = useState(0)

    //error popup 
    const [open, setOpen] = useState(false)

    // switch tag handler
    function handleChange(event, newValue){
        setTag(newValue)
        setValue(newValue)
    }

    // popup handler
    useEffect(()=>{if(error?.type===DISPLAY.POPUP)setOpen(true)},[error])

    // scroll handler
    const followerLoadRef = useInfiniteScroll({
        hasMore:followersHasMore, 
        loading, 
        onLoadMore: getFollowerList})

    const followingLoadRef = useInfiniteScroll({
        hasMore: followingHasMore, 
        loading, 
        onLoadMore: getFollowingList})

    return(
       <>   
        <PopupNotification open={open} onClose={()=>setOpen(false)} content={error?.message || "An unexpect error occurred"} btnTitle={LABEL.CLOSE}/>
        <Column customStyle={{pt:"1rem", width:"60%",mx:"auto", gap:"2rem"}}>
            <Typography variant="title">{TITLE.FOLLOW_LIST + ` (${actor})`}</Typography>
            <Box width={"100%"} sx={{
                border:"solid white 1px",    
                borderRadius:"10px",
                overflow:"hidden"
                }}>

                {/* The top tab */}
                <Tabs value={value} onChange={handleChange} 
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
                    <Tab label={LABEL.FOLLOW} {...allyProps(0)} sx={{flex:1, maxWidth:"none"}}/>
                    <Tab label={LABEL.FOLLOWING} {...allyProps(1)} sx={{flex:1, maxWidth:"none"}}/>
                </Tabs>
                
                {/* Follow tab */}
                <CustomTabPanel value={value} index={0}>
                    {followers.length !==0 
                    ? followers.map((item, index)=>(<BlockContent 
                        onClick={(e)=>{
                            e.stopPropagation()
                            navigate(item?.canFollow === undefined ? ROUTES.USER: ROUTES.CLIENT_PAGE + `/${item.follower.username}`)
                        }}
                        key = {item.follower.username || index}
                        bodyStyle={{
                            display:"flex", 
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            px:"3rem",
                            py:"1rem",
                            cursor:"pointer",
                            ...index === followers.length - 1 ? undefined : { borderBottom:"solid #BCBDBF 1px"}
                        }}>
                        <Typography variant="h6" fontWeight={"bold"}>{item.follower.username}</Typography>
                        {item?.canFollow !== undefined && <Button 
                            loadingPosition="start"
                            loadingIndicator={<CircularProgress/>}
                            loading = {btnLoading[item.follower.username] || false}
                            onClick={(e) => {
                                e.stopPropagation()
                                item.canFollow ? handleFollow(item.follower.username): UnFollow(item.follower.username)
                            }}
                            variant={item.canFollow ? "contained" : "darker"} 
                            sx={{px:"3rem"}}>
                                {item.canFollow ? TEXT.FOLLOW : TEXT.UNFOLLOW}
                            </Button> }
                    </BlockContent>)) 
                    :<BlockContent customStyle={{py:"4rem"}}>
                        <Typography sx={{textAlign:"center"}} variant="h6">{TEXT.NO_FOLLOWERS}</Typography>
                    </BlockContent> }
                    
                    {followersHasMore && <div ref={followerLoadRef} style={{height:"20px"}}/>}
                    <Fade in={loading} unmountOnExit>
                        <Box sx={{display:"flex",justifyContent:"center",py:2}}>
                            <CircularProgress />
                        </Box>
                    </Fade>
                </CustomTabPanel>

                {/* Following tab */}
                <CustomTabPanel value={value} index={1}>
                    {followings.length 
                    ? followings.map((item, index)=>(
                    <BlockContent 
                        onClick={(e)=>{
                            e.stopPropagation()
                            navigate(item.canFollow === undefined ? ROUTES.USER: ROUTES.CLIENT_PAGE + `/${item.followee.username}`
                        )}}
                        key={item.followee.username || index}
                        bodyStyle={{
                            display:"flex", 
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            px:"3rem",
                            py:"1rem",
                            cursor:"pointer",
                            ...(index === followings.length - 1 ? undefined : { borderBottom:"solid #BCBDBF 1px"})
                        }}>
                        <Typography variant="h6" fontWeight={"bold"}>{item.followee.username}</Typography>
                        {item?.canFollow !== undefined && <Button 
                            loadingPosition="start"
                            loadingIndicator={<CircularProgress/>}
                            loading = {btnLoading[item.followee.username] || false}
                            onClick={(e) => {
                                e.stopPropagation()
                                item.canFollow ? handleFollow(item.followee.username): UnFollow(item.followee.username)
                            }}
                            variant={item.canFollow ? "contained" : "darker"} 
                            sx={{px:"3rem"}}>
                                {item.canFollow ? TEXT.FOLLOW : TEXT.UNFOLLOW}
                        </Button>}
                    </BlockContent>))
                    : 
                    <BlockContent customStyle={{py:"4rem"}}>
                        <Typography sx={{textAlign:"center"}} variant="h6">{TEXT.NO_FOLLOWINGS}</Typography>
                    </BlockContent>}

                    {followingHasMore && <div ref={followingLoadRef} style={{height:"20px"}}/>}
                    <Fade in={loading} unmountOnExit>
                        <Box sx={{display:"flex",justifyContent:"center",py:2}}>
                            <CircularProgress />
                        </Box>
                    </Fade>
                </CustomTabPanel>
            </Box>
        </Column>
       </>
    )
}