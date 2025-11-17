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

import ArrowIcon from "../../../src/assets/icons/arrow.svg?react";
// Services & Utils
import { handleDeleteMyPost, handleEditMyPost } from "../../services/request/postRequest";
import { extractUsernames } from "../../utils/extractUsernames";
import { Result } from "../../class";
import { DISPLAY, TITLE } from "../../constant";
import usePin from "../../hooks/usePin"

// API
import postApi from "../../services/api/postApi";

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
// --- VOTE STATE ---
const [voteState, setVoteState] = useState({
  isUpvote: item.isUpvote, // true | false | null
  up: item.upvoteNumber,
  down: item.downvoteNumber,
});

// Cập nhật khi item thay đổi
useEffect(() => {
  setVoteState({
    isUpvote: item.isUpvote,
    up: item.upvoteNumber,
    down: item.downvoteNumber,
  });
}, [item]);

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


// --- HANDLE VOTE ---
const handleVote = async (isUpVote) => {
  if (!currentItem?.id) return;

  try {
    let response;

    //  Nhấn lại nút → HỦY VOTE
    if (voteState.isUpvote === isUpVote) {
      response = await postApi.cancel(currentItem.id);

      if (response?.data?.statusCode === 200) {
        setVoteState((prev) => ({
          isUpvote: null,
          up: isUpVote ? prev.up - 1 : prev.up,
          down: !isUpVote ? prev.down - 1 : prev.down,
        }));
      }
      return;
    }

    //  Vote 
    response = await postApi.Vote(currentItem.id, isUpVote);

    if (response?.data?.statusCode === 200) {
      setVoteState((prev) => ({
        isUpvote: isUpVote,
        up:
          isUpVote
            ? prev.up + 1 - (prev.isUpvote === false ? 1 : 0)
            : prev.up - (prev.isUpvote === true ? 1 : 0),

        down:
          !isUpVote
            ? prev.down + 1 - (prev.isUpvote === true ? 1 : 0)
            : prev.down - (prev.isUpvote === false ? 1 : 0),
      }));
    }
  } catch (err) {
    console.error("❌ Vote error:", err);
  }
};



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
  {/* Vote trực tiếp dùng ArrowIcon - Giao diện cân đối hơn */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1.5, // Tăng khoảng cách giữa các phần tử một chút
    // Đặt chiều cao tổng thể nhỏ hơn cho sự gọn gàng
  }}
>
  {/* UPVOTE */}
  <Box
    onClick={() => handleVote(true)}
    sx={{
      p: "4px", // Giảm padding để thu nhỏ khu vực click và biểu tượng
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "transparent",
      "&:hover": { bgcolor: "#1b1b1b" },
      transition: "background-color 0.2s ease", // Thêm transition cho hover
    }}
  >
    <ArrowIcon
      style={{
        transform: "rotate(-45deg)",
        width: 24, // Giảm kích thước biểu tượng
        height: 24, // Giảm kích thước biểu tượng
        color: voteState.isUpvote === true ? "#4CAF50" : "#A0A0A0", // Dùng màu xám nhạt hơn cho trạng thái mặc định
        transition: "color 0.2s ease",
      }}
    />
  </Box>

  {/* SCORE */}
  <Box
    sx={{
      minWidth: 30, // Giảm minWidth vì biểu tượng đã nhỏ hơn
      textAlign: "center",
      fontWeight: 700,
      fontSize: "1.1rem", // Kích thước font rõ ràng
      color: "#ffffff", // Màu chữ trắng
      // Có thể thêm màu sắc dựa trên điểm số (ví dụ: >0 là xanh, <0 là đỏ)
    }}
  >
    {voteState.up - voteState.down}
  </Box>

  {/* DOWNVOTE */}
  <Box
    onClick={() => handleVote(false)}
    sx={{
      p: "4px", // Giảm padding
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "transparent",
      "&:hover": { bgcolor: "#1b1b1b" },
      transition: "background-color 0.2s ease", // Thêm transition cho hover
    }}
  >
    <ArrowIcon
      style={{
        transform: "rotate(135deg)",
        width: 24, // Giảm kích thước biểu tượng
        height: 24, // Giảm kích thước biểu tượng
        color: voteState.isUpvote === false ? "#F44336" : "#A0A0A0", // Dùng màu xám nhạt hơn cho trạng thái mặc định
        transition: "color 0.2s ease",
      }}
    />
  </Box>
</Box>




          <CommentButton data={currentItem.commentNumber} sx={{ width: "130px" }}  />



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