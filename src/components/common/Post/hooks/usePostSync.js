import { useRef, useEffect, useContext } from "react";
import { PostSyncContext } from "../../../../provider/PostProvider";
export function usePostSync(postId, dispatch, isActive) {
  const { getPostState } = useContext(PostSyncContext);
  const lastSyncTime = useRef({
    vote: 0,
    save: 0,
    comment: 0
  });
  useEffect(() => {
    if(!isActive) return
    const state = getPostState(postId);
    if (!state) return;
    function sync(field, handler) {
      const data = state[field];
      if (!data) return;
      const updated = data.updatedAt;
      if (updated > lastSyncTime.current[field]) {
        handler(data);
        lastSyncTime.current[field] = updated;
      }
    }
    sync("vote", (data) => {
      console.log('sync')
      dispatch({
        type: "VOTE_SYNC",
        payload: {
          isUpvote: data.isUpvote,
          up: data.up,
          down: data.down,
        },
      });
    });
    sync("save", (data) => {
      dispatch({
        type: "SAVE_SYNC",
        payload: {
          isSaved: data.isSaved,
          saveNumber: data.saveNumber,
        },
      });
    });
    sync("comment", (data) => {
      dispatch({
        type: "COMMENT_SYNC",
        payload: {
          commentNumber: data.commentNumber,
        },
      });
    });
  }, [postId, getPostState, dispatch, isActive]);
}
