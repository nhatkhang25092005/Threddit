import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { handleSavePost, handleUnSavePost } from '../../services/request/postRequest';
import {Button, Typography,CircularProgress} from "@mui/material"
import { useContext, useEffect, useRef, useState } from 'react';
import { PostSyncContext } from '../../provider/PostProvider';
export default function MakerButton({data, sx, marked = false, postId, ...rest}){
    const [save, setSave] = useState(marked)
    const [loading, setLoading] = useState(false)
    const [displayData, setDisplayData] = useState(data)
    const {updateSave, getPostState} = useContext(PostSyncContext)
    const lastSaveUpdateTimeRef = useRef(0)
     useEffect(() => {
        setSave(marked)
        setDisplayData(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])

    useEffect(()=>{
        const postState = getPostState(postId)
        if(postState?.save){
            if(postState.save.updatedAt > lastSaveUpdateTimeRef.current){
                setSave(postState.save.isSaved)
                setDisplayData(postState.save.saveNumber)
                lastSaveUpdateTimeRef.current = postState.save.updatedAt
            }
        }
    },[postId, getPostState])

    if(!postId) {
        console.error("Post id can not be null when init save or unsave!")
        return
    }

    const toggleSave = async (e) => {
        if(loading) return

        const snapshot ={
            save,
            displayData
        }
        setLoading(true)
        try {

            const response = save ? await handleUnSavePost(postId) : await handleSavePost(postId)
            if (response.isOk()) {
            const newState = {
                isSave : !save,
                saveNumber : displayData  + (save ? -1 : 1)
            }
            setSave(!save)
            setDisplayData(prev => prev + (save ? -1 : 1))
            updateSave(postId, newState.isSave, newState.saveNumber)
            } else {console.error("Error in marker Button:", response.message)}
            if (rest.onClick) rest.onClick(e)
            
        } catch (err) {
            console.error(err)
            setSave(snapshot.save)
            setDisplayData(snapshot.displayData)
            updateSave(postId, snapshot.save, snapshot.displayData)
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