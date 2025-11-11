import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { CircularProgress } from "@mui/material";
// Custom
import BlockContent from "./BlockContent";
import OptionsMenu from "./OptionsMenu";
import ArrowButton from "./ArrowButton";
import CommentButton from "./CommentButton";
import MakerButton from "./MakerButton";
import ShareButton from "./ShareButton";
import EditableContent from "./EditableContent";

// Services & Utils
import { handleDeleteMyPost, handleEditMyPost } from "../../services/request/postRequest";
import { extractUsernames } from "../../utils/extractUsernames";
import { Result } from "../../class";
import { DISPLAY, TITLE } from "../../constant";
import usePin from "../../hooks/usePin"

export default function Post({
  item,
  index,
  createdPostsLength,
  adjustSavePostAfterUnsave = null, // This prop just need for save posts list
  isOwner = false,
  onResult, // Callback to handle error comes
  onPostUpdatedRendering, // Callback to notice parent component when change occurs
}) {
  const { pinPost, unpinPost, pinLoading } = usePin();
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(item);

  useEffect(()=>{setCurrentItem(item)},[item])

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
        // Update local state
        setCurrentItem(prev => ({ ...prev, content: editContent }));
        
        // Notify parent component
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
        // Notify parent component
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
    <BlockContent
      key={index}
      customStyle={{
        px: "1rem",
        ...(index === createdPostsLength - 1 ? { borderBottom: "none" } : undefined)
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
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            {currentItem.author.username}
          </Typography>
          <Typography variant="sub"> {currentItem.createdAt}</Typography>
          {currentItem.isPinned && <PushPinIcon sx={{ color: "#d9ff41ff" }} />}
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
          <CommentButton data={currentItem.commentNumber} sx={{ width: "130px" }} />
          <MakerButton
            data={Number(currentItem.saveNumber)}
            sx={{ width: "130px" }}
            marked={currentItem.isSave ? true : false}
            postId={currentItem.id}
            onClick = {adjustSavePostAfterUnsave ? () => adjustSavePostAfterUnsave(currentItem.id) : undefined}
          />
          <ShareButton />
        </Box>
      }
      footerStyle={{
        py: "1rem",
        mb: "1rem",
        ...(index === createdPostsLength - 1
          ? { mb: "0", borderBottom: "None" }
          : { borderBottom: "solid #BCBDBF 1px" }),
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
    </BlockContent>
  );
}