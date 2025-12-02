import { Modal, Typography, CircularProgress, Box, TextField } from "@mui/material"
import Post from "../../../components/common/Post"
import usePostDetail from "../hooks/usePostDetail"
import Mention from "../../../components/common/Mention"
import { useEffect, useRef, useState } from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { DISPLAY, LABEL } from "../../../constant"
import SendIcon from '@mui/icons-material/Send'
import CommentProvider from "../../../provider/CommentProvider"
import PopupNotification from "../../../components/common/PopupNotification"
import SnakeBarNotification from "../../../components/common/SnakeBarNotification"
import useInfiniteScroll from "../../../hooks/useInfiniteScroll"
const sxForTheParentBox = {
  border: "solid #a4a4a463 2px",
  width: "70%",
  height: "90vh",
  mx: "auto",
  mt: "5vh",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
}

const sxForTheHeaderBox = {
  position: "relative",
  p: "1rem",
  borderBottom: "1px solid #333",
  flexShrink: 0,
  bgcolor: '#0A0B0B'
}

const sxForCloseIcon = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  cursor: "pointer",
}

const sxForBody = {
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#0A0B0B',
  },
  '&::-webkit-scrollbar-thumb': {
    cursor:"pointer",
      '&:hover': {background: '#777'},
    background: '#555',
    borderRadius: '4px',
  },
}

const overrideSxForPost = {
  minHeight: "100%",
  width: "100%",
  mx: "auto",
  height: "fit-content",
}

const sxForCommentInputBox = {
  p: "1rem",
  borderTop: "1px solid #333",
  bgcolor: "#0A0B0B",
  flexShrink: 0,
}

const sxForTextField = {
  '& .MuiOutlinedInput-root': {
    color: "white",
    bgcolor: '#0A0B0B',
    "& fieldset": {
      borderColor: "#444",
      borderRadius: "20px",
    },
    "&:hover fieldset": {
      borderColor: "#666",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
   '& .MuiOutlinedInput-root textarea': {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#0A0B0B',
    },
    '&::-webkit-scrollbar-thumb': {
      cursor:"pointer",
      '&:hover': {background: '#777'},
      background: '#555',
      borderRadius: '4px',
    },
  },
  
}

const sxForLoading = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const sxForSendIcon = { cursor: "pointer", p: "4px", "&:hover": { p: 0 } }
const sxForDisabledSendIcon = { p: "4px", opacity: "10%" }

export default function PostDetail({ onOpen, onClose }) {
  return (
    <Modal
      sx={{ zIndex: 40 }}
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CommentProvider>
        <PostDetailContent onClose={onClose}/>
      </CommentProvider>
    </Modal>
  )
}
//
function PostDetailContent({ onClose }) {
  const textFieldRef = useRef(null)
  const {
    post,
    comments,
    loading,
    result,
    commentInput,
    hasMoreComment,
    getMoreCommentLoading,
    followers,
    followersLoading,
    isFollowerHasMore,
    postCmtLoading,
    onUpdateComment,
    onPostComment,
    setResult,
    fetchFollowers,
    fetchComment,
    setCommentInput,
  } = usePostDetail()

  const followingsRef = useInfiniteScroll({
    hasMore: isFollowerHasMore,
    loading: followersLoading,
    onLoadMore: fetchFollowers
  })

  const [openPopup, setOpenPopup] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  useEffect(() => {
    if (result?.type === DISPLAY.POPUP) setOpenPopup(true)
    if (result?.type === DISPLAY.SNACKBAR) setOpenSnack(true)
  }, [result])

  const { handleCommentChange, handleKeyDown: handleMentionKeyDown, mentionUI } = Mention({
    textFieldRef,
    commentContent : commentInput,
    setCommentContent : setCommentInput,
    followers,
    fetchFollowers,
    followingsRef,
    isFollowerHasMore,
    followersLoading,
  })

  function handleKeyDown(e) {
    handleMentionKeyDown(e)

    if (e.key === 'Enter' && !e.shiftKey && !e.defaultPrevented) {
      e.preventDefault()
      if (commentInput.trim() !== "" && !postCmtLoading) {
        onPostComment(commentInput)
      }
    }
  }

  if (loading) {
    return (
      <Box sx={sxForLoading}>
        <CircularProgress sx={{ color: "white" }} size={50} />
      </Box>
    )
  }

  return (
    <>
      {
        post !== null 
        ?
        <>
        <SnakeBarNotification 
          duration={3000} 
          message={result?.message} 
          open={openSnack} 
          onClose={() => setOpenSnack(false)} 
        />
        <PopupNotification 
          open={openPopup} 
          onClose={() => setOpenPopup(false)} 
          title={result?.title} 
          content={result?.message} 
        />
        
        <Box sx={sxForTheParentBox}>
          <Box sx={sxForTheHeaderBox}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Bài viết của {post.author.username}
            </Typography>
            <HighlightOffIcon sx={sxForCloseIcon} onClick={onClose} />
          </Box>

          <Box sx={sxForBody}>
            <Post
              key={post.id}
              sx={overrideSxForPost}
              onComment={true}
              commentList={comments}
              item={post}
              index={Number(post?.id)}
              onResult={setResult}
              onUpdateComment={onUpdateComment}
              onGetMoreComment={{
                getMoreComment: fetchComment,
                hasMore: hasMoreComment,
                getMoreCommentLoading: getMoreCommentLoading
              }}
            />
          </Box>

          <Box sx={sxForCommentInputBox}>
            <Typography fontWeight="bold" variant="body2" sx={{ mb: 1 }}>
              {localStorage.getItem("username")}
            </Typography>
            
            <Box sx={{ 
              display: "flex", 
              flexDirection: "row", 
              alignItems: 'center', 
              gap: '1rem', 
              position: 'relative' 
            }}>
              <TextField
                multiline
                placeholder={LABEL.WRITE_COMMENT}
                fullWidth
                minRows={1}
                maxRows={4}
                inputRef={textFieldRef}
                value={commentInput}
                onChange={handleCommentChange}
                onKeyDown={handleKeyDown}
                sx={sxForTextField}
              />
              
              {postCmtLoading ? (
                <CircularProgress sx={{ color: "white" }} size={50} />
              ) : (
                commentInput.trim().length !== 0 ? (
                  <SendIcon
                    onClick={() => onPostComment(commentInput)}
                    sx={sxForSendIcon}
                    fontSize='large'
                  />
                ) : (
                  <SendIcon
                    sx={sxForDisabledSendIcon}
                    fontSize='large'
                  />
                )
              )}
            </Box>
            {mentionUI}
          </Box>
        </Box>
        </>
        :<PopupNotification  
          open={openPopup} 
          onClose={() => {setOpenPopup(false); onClose()}} 
          title={result?.title} 
          content={result?.message} />
      }
    </>
  )
}