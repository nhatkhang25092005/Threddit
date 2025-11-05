import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { handleSavePost, handleUnSavePost } from '../../services/request/postRequest';
import {Button, Typography,CircularProgress} from "@mui/material"
import { useState } from 'react';
export default function MakerButton({data, sx, marked = false, postId}){
    const [save, setSave] = useState(marked)
    const [loading, setLoading] = useState(false)
    const [displayData, setDisplayData] = useState(data)

    if(!postId) {
        console.error("Post id can not be null when init save or unsave!")
        return
    }
    async function savePost() {
        setLoading(true)
        const response = await handleSavePost(postId)
        if(response.isOk()){
            setSave(true)
            setDisplayData(prev=>prev + 1)
        }
        else{
            console.error("Fail in save post")
            return
        }
        setLoading(false)
    }

    async function unSavePost(){
        setLoading(true)
        const response = await handleUnSavePost(postId)
        if(response.isOk()){
            setSave(false)
            setDisplayData(prev=>prev - 1)
        }
        else{
            console.error("Fail in unsave post")
            return
        }
        setLoading(false)
    }
    return(
         <Button  
            onClick={save ? unSavePost : savePost}
            variant='interact' 
            sx={{display:"flex", flexDirection:"row", gap:"3px", alignItems: "center", ...sx}}
            disabled={loading}
        >
            {loading ? (
                <CircularProgress size={18} sx={{ color: 'white' }} />
            ) : (
                !save ? <BookmarkBorderOutlinedIcon/> : <BookmarkIcon/>
            )}
            <Typography>{displayData}</Typography>
        </Button>
    )
}