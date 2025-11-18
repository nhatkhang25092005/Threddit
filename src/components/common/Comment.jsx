import { useState } from "react"
import {Box, Typography, Button, Menu, MenuItem, TextField, IconButton, CircularProgress } from "@mui/material"
import {DISPLAY, TEXT, TITLE, LABEL} from '../../constant'
import BlockContent from "./BlockContent"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { handleDeleteComment, handleEditComment } from "../../services/request/commentRequest";
import { extractUsernames } from "../../utils/extractUsernames";
import { Result } from "../../class";
import EditableContent from "./EditableContent";


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
    console.log('delete comment is called')
    setLoading(true)
    try{
      const response = await handleDeleteComment(postId, comment.id)
      console.log(response)
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
        {comment.isCommenter
        ? <Typography variant="sub" sx={{ml:"5px"}}>({TEXT.ITS_YOU})</Typography>
        : undefined}
        <Box sx={{display:"flex", flexDirection:"row", alignItems:"flex-start",width:"100%"}}>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"start", ml:"1rem", width:isEditing ? "100%" : 'fit-content'}}>
            <Box sx={{width:"100%", display:"flex", flexDirection:"row"}}>
              <EditableContent
                editStyle={{width:"100%"}}
                nonEditStyle={{display:"flex", flexDirection:"column", bgcolor:"#bcbdbf43", borderRadius:"1rem",py:0.5,px:2,width:"fit-content"}}
                isEditing={isEditing} 
                content={comment?.content} 
                editContent={editComment}
                onCancel={cancelEditComment}
                loading={loading}
                onSave={saveEditComment}
                onEditChange={setEditComment}
              />
               {(comment.isCommenter && !isEditing) &&
              <CommentMenu  
                editComment={()=>startEditComment(comment.content)}
                deleteComment={()=>deleteComment()}  
              />}
            </Box>
            <Typography variant="sub" sx={{ml:"0.5rem", fontSize:"15px"}}>{comment.createdAt}</Typography>
          </Box>
        </Box>
      </Box>
    </BlockContent>
  )
}