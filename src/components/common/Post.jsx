import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { CircularProgress, Box, Typography } from "@mui/material";

// Custom
import BlockContent from "./BlockContent";
import OptionsMenu from "./OptionsMenu";
import ArrowButton from "./ArrowButton";
import CommentButton from "./CommentButton";
import MakerButton from "./MakerButton";
import ShareButton from "./ShareButton";
import EditableContent from "./EditableContent";
import PostDetail from "../../features/post/page/PostDetail";
import Comment from "./Comment"

// Services & Utils
import { handleDeleteMyPost, handleEditMyPost } from "../../services/request/postRequest";
import { extractUsernames } from "../../utils/extractUsernames";
import { Result } from "../../class";
import { DISPLAY, ROUTES, TEXT, TITLE } from "../../constant";
import usePin from "../../hooks/usePin"




export default function Post({
  onUpdateComment,
  showPin,
  location,
  sx,
  onComment,
  commentList,
  onNavigate = false,
  item,
  index,
  createdPostsLength,
  adjustSavePostAfterUnsave = null,
  isOwner = false,
  onResult,
  onPostUpdatedRendering,
}) {
  const { pinPost, unpinPost, pinLoading } = usePin();
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(item);
  const navigate = useNavigate()
  const [openDetail, setOpenDetail] = useState(false)
  const [comments, setComments] = useState(commentList)


  // Get comments list
  useEffect(()=>{setComments(commentList)},[commentList])

  // Handle navigation
  const handleNavigateToPost = () => {
    if (onNavigate && editingPostId !== currentItem.id) {
      navigate(`${location}/${item.id}`);
      setOpenDetail(true)
    }
  };

  async function handlePin(postId, currentPinStatus){
    try{
      const result = currentPinStatus ? await unpinPost(postId) : await pinPost(postId)
      console.log("Result of the handle Pin:", result)
      if(result.isSuccess){
        setCurrentItem(prev => ({...prev, isPinned: !currentPinStatus}))
        onPostUpdatedRendering({
          type:"pin",
          postId:postId,
          newPinStatus : !currentPinStatus,
          message:"Updated successfully"
        })
      }
    }
    catch(err){
      onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, err, null))
    }
  }
  
  // Pin
  function pinProps(item) {
    return {
      label: item.isPinned ? "bỏ ghim bài viết" : "ghim bài viết",
      icon: (pinLoading ? <CircularProgress size={20} /> : (item.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />)),
      callback: () => handlePin(item.id, item.isPinned)
    };
  }

  // Start editing
  function startEditing(postId, currentContent) {
    setEditingPostId(postId);
    setEditContent(currentContent);
  }

  // Cancel editing
  function cancelEditing() {
    setEditingPostId(null);
    setEditContent("");
  }

  // Save edit
  async function saveEdit(postId) {
    if (!postId) {
      console.error("postId is required to save edit");
      return;
    }
    try {
      setLoading(true);
      const response = await handleEditMyPost(postId, editContent, extractUsernames(editContent));
      
      if (response.isOk()) {
        setCurrentItem(prev => ({ ...prev, content: editContent }));
        
        if (onPostUpdatedRendering) {
          onPostUpdatedRendering({
            type: 'edit',
            postId,
            data: { content: editContent },
            message: response.message 
          });
        }

        cancelEditing()
        if(onResult) onResult(new Result(DISPLAY.SNACKBAR, null, response.message, null))
      } else if (onResult) onResult(response.message);
      
    } catch (err) {
      if (onResult) onResult(err);
    } finally {
      setLoading(false);
    }
  }

  // Delete post
  async function deletePost(postId) {
    if (!postId) {
      console.error("postId is required to delete post");
      return;
    }
    setLoading(true);
    try {
      const response = await handleDeleteMyPost(postId);
      
      if (response.isOk()) {
        if (onPostUpdatedRendering) {
          onPostUpdatedRendering({
            type: 'delete',
            postId  
          });
        }
        if (onResult) onResult(new Result(DISPLAY.SNACKBAR, null, response.message, null))
      } else {
        if (onResult) onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));
      }
    } catch (err) {
      console.error("Error in deletePost:", err);
      if (onResult) onResult(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {openDetail && <PostDetail onOpen={openDetail} onClose={()=>{
        setOpenDetail(false)
        navigate("..", { replace: true, relative: "path" });
      }}
        />}
      <BlockContent
        key={index}
        customStyle={{
          ...sx,
          px: "1rem",
          ...(!onComment ? {"&:hover":{bgcolor:"#e9e9e904"}} : {bgcolor:"#0A0B0B"}),
          ...(index === createdPostsLength - 1  ? { borderBottom: "none" } : undefined)
        }}
      
        // Header of content block
        header={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "start",
              pb: "0px",
              gap: "1rem",
              alignItems: "center",
              mb: "1rem",
              py: "1rem",
              mx: "1rem",
              cursor: onNavigate && editingPostId !== currentItem.id ? "pointer" : "default"
            }}
          >
            <Typography variant="h6" fontWeight={"bold"}>
              {currentItem.author.username}
            </Typography>
            <Typography variant="sub"> {currentItem.createdAt}</Typography>
            {(currentItem.isPinned && showPin) && <PushPinIcon sx={{ color: "#d9ff41ff" }} />}
            {isOwner && <OptionsMenu
              functionList={[
                  { label: "xóa", icon: (<DeleteIcon />), callback: () => deletePost(currentItem.id)},
                  { label: "sửa", icon: (<EditIcon />), callback: () => startEditing(currentItem.id, currentItem.content)},
                  pinProps(currentItem)
              ]}
              sx={{ ml: "auto" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            />}
          </Box>
        }
      
        // Footer of content block
        footer={
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                justifyItems: "start",
                mx: "1rem",
              }}
            >
              <OptionsMenu
                sx={{ borderRadius: "50px" }}
                symbol={<ArrowButton data={currentItem.upvoteNumber - currentItem.downvoteNumber} sx={{ width: "130px" }} />}
                functionList={[
                  { label: "upvote", icon: (<NorthIcon />), callback: null },
                  { label: "downvote", icon:(<SouthIcon />), callback: null},
                ]}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "left",
                  horizontal: "right",
                }}
              />
      
              {/* Open the popup */}
              <CommentButton onClick={handleNavigateToPost} data={currentItem.commentNumber} sx={{ width: "130px" }} />
              
              <MakerButton
                data={Number(currentItem.saveNumber)}
                sx={{ width: "130px" }}
                marked={currentItem.isSave ? true : false}
                postId={currentItem.id}
                onClick = {adjustSavePostAfterUnsave ? () => adjustSavePostAfterUnsave(currentItem.id) : undefined}
              />
              <ShareButton />
            </Box>
      
           {/* Open comment list */}
          {onComment && (
            <Box sx={{pt:"2rem"}}>
              {comments.length !==0 
              ? comments.map((comment, index) => 
                <Comment 
                  comment={comment} 
                  index={index} 
                  postId={item.id}
                  onResult={onResult}
                  onUpdateComment={onUpdateComment}
                />)
              : <Box key="no_more_comment" sx={{flex:1, my:"5rem"}}><Typography textAlign={"center"}>{TEXT.NO_COMMENTS}</Typography></Box>}
            </Box>
          )}
          </Box>
        }
        footerStyle={{
          py: "1rem",
          mb: "1rem",
          ...((index === createdPostsLength - 1 || onComment)
            ? { mb: "0", borderBottom: "None" }
            : { borderBottom: "solid #BCBDBF 1px" }),
        }}
      >
        <Box 
          sx={{
            height:"100%",
          }}
        >
          <EditableContent
            loading={loading}
            isEditing={editingPostId === currentItem.id}
            content={currentItem.content}
            editContent={editContent}
            onEditChange={setEditContent}
            onSave={() => saveEdit(currentItem.id)}
            onCancel={cancelEditing}
          />
        </Box>
      </BlockContent>
    </>
  );
}