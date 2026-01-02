import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useContext, useEffect, memo, useReducer } from "react";
import { PostSyncContext } from "../../../provider/PostProvider";
import { initialState, postReducer } from "./store/saveReducer";
import useSync from "./hooks/useSync";
import { useToggle } from "./hooks/useToggle";
const SaveButton = memo(({
  initCount,
  sx,
  initSaveState = false,
  postId,
  ...rest
}) => {
  // console.log(`PostId: ${postId}: save state: ${initSaveState}`)
  const [state, dispatch] = useReducer(postReducer,  initialState({initSaveState,initCount}))
  const { updateSave } = useContext(PostSyncContext);
  const {saveState, loading, count, error} = state
  // console.log(saveState)
  const {toggle} = useToggle({postId, saveState, dispatch})

  useEffect(() => {
    updateSave(postId, saveState, count)
  }, [postId,saveState, count, updateSave]);

  // Sync with post detail
  useSync(postId, dispatch)

  if (!postId) {
    console.error("Post id can not be null when init save or unsave!");
    return;
  }

  // const toggleSave = async (e) => {
  //   if (loading) return;

  //   const snapshot = {
  //     save,
  //     displayData,
  //   };
  //   setLoading(true);
  //   try {
  //     const response = save
  //       ? await handleUnSavePost(postId)
  //       : await handleSavePost(postId);
  //     if (response.isOk()) {
  //       const newState = {
  //         isSave: !save,
  //         saveNumber: displayData + (save ? -1 : 1),
  //       };
  //       setSave(!save);
  //       setDisplayData((prev) => prev + (save ? -1 : 1));
  //       updateSave(postId, newState.isSave, newState.saveNumber);
  //     } else {
  //       console.error("Error in marker Button:", response.message);
  //     }
  //     if (rest.onClick) rest.onClick(e);
  //   } catch (err) {
  //     console.error(err);
  //     setSave(snapshot.save);
  //     setDisplayData(snapshot.displayData);
  //     updateSave(postId, snapshot.save, snapshot.displayData);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Button
      {...rest}
      onClick={toggle}
      variant="interact"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "3px",
        alignItems: "center",
        ...sx,
      }}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={18} sx={{ color: "white" }} />
      ) : !saveState ? (
        <BookmarkBorderOutlinedIcon />
      ) : (
        <BookmarkIcon />
      )}
      <Typography>{Number(count)}</Typography>
    </Button>
  );
})

SaveButton.displayName = 'SaveButton'
export default SaveButton
