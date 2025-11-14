import { useState } from "react"
import {Box, Typography, Button, Menu, MenuItem, TextField, IconButton, CircularProgress } from "@mui/material"
import {DISPLAY, TEXT, TITLE, LABEL} from '../../constant'
import BlockContent from "./BlockContent"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { handleDeleteComment, handleEditComment } from "../../services/request/commentRequest";
import { extractUsernames } from "../../utils/extractUsernames";
import { Result } from "../../class";


function CommentMenu({editComment, deleteComment}){
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return(
  <>
    <Button
      sx={{height:"fit-content",p:'0'}}
      id='comment-positioned-button'
      aria-controls={open ? 'comment-positioned-menu' : undefined}
      aria-haspopup = 'true'
      aria-expanded = {open ? 'true' : undefined}
      onClick={handleClick}
    >
      <MoreHorizIcon/>
    </Button>
    <Menu
      id='comment-positioned-menu'
      aria-labelledby='comment-positioned-button'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        "& .MuiPaper-elevation":{
          bgcolor:"#0A0B0B",
          marginLeft:"80px",
          border:"solid #BCBDBF 1px"
        }
      }}
    >
      <MenuItem onClick={async ()=>{await editComment(), handleClose()}}>{LABEL.EDIT_COMMENT}</MenuItem>
      <MenuItem onClick={async ()=>{await deleteComment(), handleClose()}}>{LABEL.DELETE_COMMENT}</MenuItem>
    </Menu>
  </>)
}

function EditableComment({
  isEditing, 
  comment, 
  editComment, 
  onEditChange,
  onCancel,
  loading,
  onSave
}){
  if(!isEditing) 
    return (<>
      <Box sx={{display:"flex", flexDirection:"column",ml:"1rem", bgcolor:"#bcbdbf43", borderRadius:"1rem",py:0.5,px:2,width:"fit-content"}}>
        <Typography > {comment.content}</Typography>
      </Box>  
    </>)
  else return(
    <Box sx={{display:"flex", flexDirection:"column", ml:"1rem",alignItems:"flex-end", width:"100%"}}>
      <TextField

        multiline
        fullWidth
        minRows={1}
        maxRows={10}
        value={editComment}
        autoFocus
        onChange={(e)=>onEditChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {e.preventDefault();onSave()}
          if (e.key === "Escape") {onCancel()}
        }}
        sx={{
          '& ,MuiOutlinedInput-root': {
              color:"white",
              "& fieldset": { borderColor:"#bcbcbf" },
              "&:hover fieldset": { borderColor:"white" },
              "&.Mui-focused fieldset": { borderColor:"white" },
          },
        }}
      />
      <Box sx={{display:'flex', gap:1, justifyContent:"flex-end"}}>
        {loading
        ?
          <CircularProgress size={24} sx={{alignSelf:"center"}}/>
        :
          <IconButton
            onClick={onSave}
            sx={{color:"white"}}
            size="small"  
          >
            <CheckIcon/>
          </IconButton>
        }
          <IconButton
            onClick={onCancel}
            sx={{color:"white"}}
            size="small"  
          >
            <CloseIcon/>
          </IconButton>
        
      </Box>
    </Box>
  )
}

const username = localStorage.getItem('username')
export default function Comment({
  comment, 
  index, 
  postId, 
  onResult,
  onUpdateComment
}){
  const [isEditing, setIsEditing] = useState(false)
  const [editComment, setEditComment] = useState('')
  const [loading, setLoading] = useState(false)

  function startEditComment(currentContent){
    setIsEditing(true)
    setEditComment(currentContent)
  }

  function cancelEditComment(){
    setIsEditing(false)
    setEditComment('')
  }

  async function saveEditComment(){
    setLoading(true)
    try{
      const response = await handleEditComment(
        postId, 
        comment.id, 
        editComment, 
        extractUsernames(editComment)
      )
      if(response.isOk()){
        setLoading(false)
        onUpdateComment({type:'edit', commentId : comment.id,content: editComment})
        if(onResult) onResult(new Result(DISPLAY.SNACKBAR, null, response.message, null))
        setIsEditing(false)

      }
      else if(onResult) onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))
    }
    catch(error){
      const message = error?.message || String(error)
      if(onResult) onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, message, null))
    }
  finally {setLoading(false)}
  }
  
  async function deleteComment(){
    setLoading(true)
    try{
      const response = await handleDeleteComment(postId, comment.id)
      if(response.isOk()){
        onUpdateComment({type:'delete', commentId : comment.id})
        if(onResult) onResult(new Result(DISPLAY.SNACKBAR, null, response.message, null))
      }
    }
    catch(error){
      const message = error?.message || String(error)
      if(onResult) onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, message, null))
    }
    finally {setLoading(false)}
  }

  return(
    <BlockContent customStyle={{mt:2}} key={index}>
      <Box sx={{display:"flex",flexDirection:"row", alignItems:'flex-start',justifyContent:"flex-start"}}>
        <Typography fontWeight={"bold"} variant="h7"> {comment?.commenter?.username}</Typography>
        {comment?.commenter?.username === username 
        ? <Typography variant="sub" sx={{ml:"5px"}}>({TEXT.ITS_YOU})</Typography>
        : undefined}
        <Box sx={{display:"flex", flexDirection:"row", alignItems:"flex-start",width:"100%"}}>
          <EditableComment 
            isEditing={isEditing} 
            comment={comment} 
            editComment={editComment}
            onCancel={cancelEditComment}
            loading={loading}
            onSave={saveEditComment}
            onEditChange={setEditComment}
          />
          {(comment?.commenter?.username === username && !isEditing) &&
          <CommentMenu 
            editComment={()=>startEditComment(comment.content)}
            deleteComment={()=>deleteComment()}  
          />}
        </Box>
      </Box>
    </BlockContent>
  )
}