import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { CircularProgress, Box, Typography, Fade } from "@mui/material";

// Custom
import BlockContent from "./BlockContent";
import OptionsMenu from "./OptionsMenu";
import ArrowIcon from "../../../src/assets/icons/arrow.svg?react";
import CommentButton from "./CommentButton";
import MakerButton from "./MakerButton";
import ShareButton from "./ShareButton";
import EditableContent from "./EditableContent";
import PostDetail from "../../features/post/page/PostDetail";
import Comment from "./Comment"
import useInfiniteScroll from '../../hooks/useInfiniteScroll'

// Services & Utils
import { handleDeleteMyPost, handleEditMyPost } from "../../services/request/postRequest";
import { extractUsernames } from "../../utils/extractUsernames";
import { Result } from "../../class";
import { DISPLAY, ROUTES, TEXT, TITLE } from "../../constant";
import usePin from "../../hooks/usePin"
import SnakeBarNotification from "./SnakeBarNotification";

// API
import postApi from "../../services/api/postApi";
import { PostSyncContext } from "../../provider/PostProvider";

export default function Post({
  onUpdateComment,// use for post detail update the comment list
  showPin,
  location,
  sx,
  onComment,
  commentList,
  onNavigate = false,
  item, // the post data object
  index,
  createdPostsLength,
  adjustSavePostAfterUnsave = null,
  isOwner = false,
  onResult,
  onPostUpdatedRendering,
  onGetMoreComment,
}) {

  
  function normalizeItem(item){
    const {isSave, isSaved, ...rest} = item
    return{
      ...rest,
      isSaved:isSaved ?? isSave ?? false
    }
  }
  const { pinPost, unpinPost, pinLoading } = usePin();
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState(normalizeItem(item));
  const navigate = useNavigate()
  const [openDetail, setOpenDetail] = useState(false)
  const [comments, setComments] = useState(commentList)
  const {updateVote, getPostState} = useContext(PostSyncContext)
  const lastUpdateTimeRef = useRef(0)

  useEffect(()=>{
    const postState = getPostState(item.id)
    if(postState){
      if(postState?.vote){
        if(postState.vote.updatedAt > lastUpdateTimeRef.current){
          setVoteState({
            isUpvote:postState.vote.isUpvote,
            up:postState.vote.up,
            down:postState.vote.down
          })
        }
      }
      if (postState?.save) {
        if(postState.save.updatedAt > lastUpdateTimeRef.current){
          setCurrentItem(prev => ({
            ...prev,
            isSaved: postState.save.isSaved,
            saveNumber: postState.save.saveNumber
          }));
        } 
      }
      
      if (postState?.comment) {
        if(postState.comment.updatedAt > lastUpdateTimeRef.current){
          console.log("PostState.comment listening =)")
          setCurrentItem(prev => ({
            ...prev,
            commentNumber: postState.comment.commentNumber
          }));      
        }
        
      }
    }
  },[getPostState, item.id])
  
  // Comment Scrolling
  const {getMoreComment = null, hasMore = null, getMoreCommentLoading = null} = onGetMoreComment || {}
  const commentRef = useInfiniteScroll({
    hasMore,
    loading : getMoreCommentLoading, 
    onLoadMore : getMoreComment
  })

  // Get comments list
  useEffect(()=>{
    setComments(commentList)
    if(commentList) setCurrentItem(prev=>({...prev, commentNumber : commentList.length}))
  },[commentList])
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
      setEditLoading(true);
      const response = await handleEditMyPost(postId, editContent, extractUsernames(editContent));
      console.log(response)
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
      } else if (onResult) onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message));
      
    } catch (err) {
      if (onResult) onResult(err);
    } finally {
      setEditLoading(false);
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

// --- HANDLE VOTE ---
const [voteState, setVoteState] = useState({
  isUpvote: item.isUpvote, // true | false | null
  up: Number(item.upvoteNumber),
  down: Number(item.downvoteNumber),
});

// Cập nhật khi item thay đổi
useEffect(() => {
  setVoteState({
    isUpvote: item.isUpvote, // true | false | null
    up: Number(item.upvoteNumber),
    down: Number(item.downvoteNumber),
  });
}, [item.id, item.isUpvote, item.upvoteNumber, item.downvoteNumber]);

const handleVote = async (isUpVote) => {
  if (!item?.id){
    console.error("item id can not be null when init vote")
    return
  };

  //  LƯU SNAPSHOT TRƯỚC KHI UPDATE
  const snapshot = {
    isUpvote: item.isUpvote, // true | false | null
    up: Number(item.upvoteNumber),
    down: Number(item.downvoteNumber),
  };

  try {
    // Cancel Vote
    if (voteState.isUpvote === isUpVote) {
      const newState = {
        isUpvote: null,
        up: isUpVote ? voteState.up - 1 : voteState.up,
        down: !isUpVote ? voteState.down - 1 : voteState.down,
      }
      setVoteState(newState);
      lastUpdateTimeRef.current = Date.now()
      updateVote(item.id, newState)
      const response = await postApi.cancel(item.id);
      
      if (response?.data?.statusCode !== 200) {
        setVoteState(snapshot);
        updateVote(item.id, snapshot)
      }
      return;
    }

    // Update Vote
    const newState = {
      isUpvote:isUpVote,
      up: voteState.up + (isUpVote ? 1 : 0) - (voteState.isUpvote === true ? 1 : 0),
      down:voteState.down + (!isUpVote ? 1 : 0) - (voteState.isUpvote === false ? 1 : 0)
    }
    setVoteState(newState)
    lastUpdateTimeRef.current = Date.now()
    updateVote(item.id, newState)
    const response = await postApi.Vote(item.id, isUpVote);

    if (response?.data?.statusCode !== 200) {
      //  Rollback về snapshot
      setVoteState(snapshot);
    }
  } catch (err) {
    console.error("Vote error:", err);
    //  Rollback về snapshot
    setVoteState(snapshot);
  }
};
  // Tính điểm tổng
  const score = voteState.up - voteState.down;

  const [openSnack, setOpenSnack] = useState(false)
  const [resultOfShare, setResultOfShare] = useState(null)

  useEffect(()=>{if(resultOfShare) setOpenSnack(true)},[resultOfShare])

  function handleRedirectOnName(e){
    e.stopPropagation()
    if(isOwner) navigate(ROUTES.USER)
    else navigate(ROUTES.CLIENT_PAGE + `/${currentItem.author.username}`)
  }
  return (
    <>
      <SnakeBarNotification open={openSnack} onClose={()=>setOpenSnack(false)} duration={3000} message={resultOfShare?.message}/>
      {openDetail && <PostDetail 
        onOpen={openDetail} 
        onClose={()=>{
          setOpenDetail(false)
          navigate("..", { replace: true, relative: "path" });
        }}
        />}
      <BlockContent
        key={index}
        customStyle={{...sx, px: "1rem", bgcolor:"#0A0B0B", ...(index === createdPostsLength - 1  ? { borderBottom: "none" } : undefined)}}
      
        // Header of content block
        header={
          <Box sx={{display: "flex", flexDirection: "row", justifyItems: "start", pb: "0px", gap: "1rem", alignItems: "center", mb: "1rem",py: "1rem",mx: "1rem",}}>
            <Typography onClick={(e)=>{handleRedirectOnName(e)}} variant="h6" fontWeight={"bold"} sx={{cursor:'pointer','&:hover':{fontStyle:'underline'}}}>
              {currentItem?.author?.username}
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
              anchorOrigin={{vertical: "bottom", horizontal: "left"}}
              transformOrigin={{vertical: "top", horizontal: "right",}}
            />}
          </Box>
        }
      
        // Footer of content block
        footer={
          <Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", justifyItems: "start", mx: "1rem"}}>
            <Box sx={{display: "flex", alignItems: "center", gap: 1.5,}}>
              {/* UPVOTE */}
              <Box
                onClick={() => handleVote(true)}
                sx={{p: "4px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center",justifyContent: "center", bgcolor: "transparent","&:hover": { bgcolor: "#1b1b1b" },transition: "background-color 0.2s ease",}}>
                <ArrowIcon style={{transform: "rotate(-45deg)", width: 24, height: 24, color: voteState.isUpvote === true ? "#4CAF50" : "#A0A0A0",transition: "color 0.2s ease",}}/>
              </Box>
              <Box sx={{minWidth: 30, textAlign: "center", fontWeight: 700, fontSize: "1.1rem", color: "#ffffff"}}>
                {score}
              </Box>
                <Box
                  onClick={() => handleVote(false)}
                  sx={{p: "4px", borderRadius: "50%", cursor: "pointer", display: "flex",alignItems: "center", justifyContent: "center", bgcolor: "transparent","&:hover": { bgcolor: "#1b1b1b" },transition: "background-color 0.2s ease"}}>
                  <ArrowIcon style={{transform: "rotate(135deg)", width: 24,  height: 24, color: voteState.isUpvote === false ? "#F44336" : "#A0A0A0", transition: "color 0.2s ease",}}/>
                </Box>
              </Box>
      
              {/* Open the  */}
              <CommentButton onClick={handleNavigateToPost} data={currentItem.commentNumber} sx={{ width: "130px" }} />
              
              <MakerButton
                data={Number(currentItem.saveNumber)}
                sx={{ width: "130px" }}
                marked={currentItem.isSaved ? true : false}
                postId={currentItem.id}
                onClick = {adjustSavePostAfterUnsave ? () => adjustSavePostAfterUnsave(currentItem.id) : undefined}
              />
              <ShareButton onNotification={setResultOfShare} postId={item.id} />
            </Box>
      
           {/* Open comment list */}
          {onComment && (
            <Box sx={{pt:"2rem"}}>
              {comments.length !==0 
              ? comments.map((comment, index) => 
                <Comment 
                  key={index}
                  comment={comment} 
                  index={index} 
                  postId={item.id}
                  onResult={onResult}
                  onUpdateComment={onUpdateComment}
                />)
              : <Box key="no_more_comment" sx={{flex:1, my:"5rem"}}><Typography textAlign={"center"}>{TEXT.NO_COMMENTS}</Typography></Box>}
            </Box>
          )}

          <div ref={commentRef} style={{ visibility: hasMore ? "visible" : "hidden" }}/>
          <Fade in={loading} unmountOnExit>
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress />
            </Box>
          </Fade>
          </Box>
          }
          footerStyle={{py: "1rem", mb: "1rem", ...((index === createdPostsLength - 1 || onComment) ? { mb: "0", borderBottom: "None" } : { borderBottom: "solid #BCBDBF 1px" }),}}
        >
        <Box sx={{height:"100%"}}>
          <EditableContent
            loading={editLoading}
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