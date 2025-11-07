import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { handleSavePost, handleUnSavePost } from '../../services/request/postRequest';
import {Button, Typography,CircularProgress} from "@mui/material"
import { useEffect, useState } from 'react';
export default function MakerButton({data, sx, marked = false, postId, ...rest}){
    const [save, setSave] = useState(marked)
    const [loading, setLoading] = useState(false)
    const [displayData, setDisplayData] = useState(data)
     useEffect(() => {
        setSave(marked)
        setDisplayData(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])
    if(!postId) {
        console.error("Post id can not be null when init save or unsave!")
        return
    }

    const toggleSave = async (e) => {
        setLoading(true)
        try {
            const response = save ? await handleUnSavePost(postId) : await handleSavePost(postId)
            if (response.isOk()) {
            setSave(!save)
            setDisplayData(prev => prev + (save ? -1 : 1))
            } else {console.error(`Fail in ${save ? "unsave" : "save"} post`)}
            if (rest.onClick) rest.onClick(e)
            
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        
    }

    return(
         <Button  
            {...rest}
            onClick={(e)=>toggleSave(e)}
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