import { Box, TextField, IconButton, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import Mention from "./Mention";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { handleGetFollowersListRequest } from "../../services/request/followRequest";

export default function EditableContent({
    isEditing, 
    content, 
    editContent, 
    onEditChange, 
    onSave,
    onCancel,
    loading,
    editStyle,
    nonEditStyle
}) {
    const textFieldRef = useRef(null)
    const cursor = useRef(null)
    const [hasMore, setHasMore] = useState(true)
    const [followers, setFollowers] = useState([])
    const [mentionLoading, setMentionLoading] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const contentRef = useRef(null)

    useEffect(()=>{
        if(contentRef.current){
            const element = contentRef.current
            const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight)
            const maxHeight = lineHeight * 10
            setShowButton(element.scrollHeight > maxHeight)
        }
    },[content])


    async function fetchFollowers() {
        if (!hasMore) return
        setMentionLoading(true)
        try {
            const response = await handleGetFollowersListRequest('me', cursor.current)
            if (response.status === 204) {
                setHasMore(false)
            } else if (response.isOk()) {
                setFollowers(prev => [...prev, ...response.data.followerList])
                cursor.current = response.data.cursor
            } else {
                console.error(response.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setMentionLoading(false)
        }
    }
    
    // Fetch followers khi bắt đầu edit
    useEffect(() => {
        if (isEditing && followers.length === 0) {
            fetchFollowers()
        }
    }, [isEditing])

    // Reset state khi thoát edit mode
    useEffect(() => {
        if (!isEditing) {
            setFollowers([])
            setHasMore(true)
            cursor.current = null
        }
    }, [isEditing])

    // Setup infinite scroll for followers
    const followersRef = useInfiniteScroll({
        hasMore,
        loading: mentionLoading,
        onLoadMore: fetchFollowers
    })

    // Setup MentionList
    const { handleCommentChange, handleKeyDown, mentionUI } = Mention({
        textFieldRef,
        commentContent: editContent,
        setCommentContent: onEditChange,
        followers: followers,
        fetchFollowers: fetchFollowers,
        followersRef,
        isFollowingsHasMore: hasMore,
        followingsLoading: mentionLoading
    })

    // Handle key down
    function handleKeyPress(e) {
        handleKeyDown(e) // Handle mention keys
        
        // Handle Ctrl+Enter to save
        if (e.key === 'Enter' && !e.defaultPrevented) {
            e.preventDefault()
            onSave()
        }
        
        // Handle Escape to cancel
        if (e.key === 'Escape' && !e.defaultPrevented) {
            e.preventDefault()
            onCancel()
        }
    }

    useEffect(()=>{
        if(!isEditing) return
        function handleClickOutside(e){
            const textField = textFieldRef.current
            if(textField && textField.contains(e.target)) return    
            if(e.target.closest('[data-edit-save]')) return
            if(e.target.closest('[data-edit-cancel]')) return
            onCancel()
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[isEditing])

    // If editing, show a text field with save and cancel buttons
    if (isEditing) {
        return (
            <Box sx={editStyle}>
                <TextField
                    ref={textFieldRef}
                    multiline
                    fullWidth
                    minRows={3}
                    maxRows={10}
                    value={editContent}
                    onChange={handleCommentChange}
                    onKeyDown={handleKeyPress}
                    autoFocus
                    sx={{
                        width:"100%",
                        '& .MuiOutlinedInput-root': {
                            color:"white",
                            "& fieldset": { borderColor:"#bcbcbf" },
                            "&:hover fieldset": { borderColor:"white" },
                            "&.Mui-focused fieldset": { borderColor:"white" },
                        },
                    }}
                />
                
                {/* Render mention UI */}
                {mentionUI}
                
                <Box sx={{display:'flex', gap:1, justifyContent:"flex-end", mt: 1}}>
                    {loading 
                    ? 
                        <CircularProgress size={24} sx={{alignSelf:"center"}}/>
                    :
                        <IconButton
                            onClick={onSave}
                            sx={{color:"#4CAF50"}}
                            size="small"
                            data-edit-save
                        >
                            <CheckIcon/>
                        </IconButton>
                    }
                    <IconButton
                        onClick={onCancel}
                        sx={{color:"#F44336"}}
                        size="small"
                        data-edit-cancel
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>  
            </Box>
        )
    }
    
    // If not editing, just display the content
    return (
        <Box>
            <Box sx={{  
                display: "flex",
                alignItems: "flex-start", 
                whiteSpace: "pre-wrap",   
                wordBreak: "break-word",  
                overflowWrap: "break-word", 
                justifyContent:"flex-start",
                pl:"0.5rem",
                pr:'0.5rem',
                width: "100%",
                ...nonEditStyle,
                ...(!isExpanded && {
                    display: '-webkit-box',
                    WebkitLineClamp: 10,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }),
            }}
                ref={contentRef}
            >
                {content}
            </Box>
            {showButton && <Button
                variant="text"
                sx={{display:"block",margin:"0 auto"}}
                onClick={() => {setIsExpanded(!isExpanded)}}
            >
                {isExpanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
            </Button>}
        </Box>
    );
}