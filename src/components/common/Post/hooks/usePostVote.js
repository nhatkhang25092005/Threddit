import { useCallback, useContext, useRef, useState } from "react";
import { PostSyncContext } from "../../../../provider/PostProvider";
import { SYSTEM_ERROR } from "../../../../constant/systemError";
import postApi from "../../../../services/api/postApi";

export function usePostVote(postId, initialVote){
  const [voteState, setVoteState] = useState({
    isUpvote: initialVote?.isUpvote ?? null,
    up: Number(initialVote?.upvoteNumber ?? 0),
    down: Number(initialVote?.downvoteNumber ?? 0),
  })
  const {updateVote} = useContext(PostSyncContext)
  const lastUpdateTimeRef = useRef(0)

  const handleVote = useCallback(async (isUpVote)=>{
    if(!postId){
      console.error(SYSTEM_ERROR.POST_ID_MISSING_WHEN_VOTING)
      return
    }

    const snapshot = {...voteState}
    try{
      // Cancel vote
      if(voteState.isUpvote === isUpVote){
        const newState = {
          isUpvote: null,
          up: isUpVote ? voteState.up - 1 : voteState.up,
          down: isUpVote ? voteState.down : voteState.down - 1,
        }
        setVoteState(newState)
        lastUpdateTimeRef.current = Date.now()
        updateVote(postId, newState)

        const response = await postApi.cancel(postId)
        if(response?.data?.statusCode !== 200){
          setVoteState(snapshot)
          updateVote(postId, snapshot)
        }

        return
      }

      const newState = {
        isUpvote: isUpVote,
        up: voteState.up + (isUpVote ? 1 : 0) - (voteState.isUpvote === true ? 1 : 0),
        down: voteState.down + (!isUpVote ? 1 : 0) - (voteState.isUpvote === false ? 1 : 0)
      }
      setVoteState(newState)
      lastUpdateTimeRef.current = Date.now()
      updateVote(postId, newState)
      const response = await postApi.Vote(postId, isUpVote)
      if(response?.data?.statusCode !== 200){
        setVoteState(snapshot)
        updateVote(postId, snapshot)
      }
    }
    catch(e){
      console.error("Vote error: ", e)
      setVoteState(snapshot)
      updateVote(postId, snapshot)
    }
  },[postId, updateVote, voteState])

  const score = voteState.up - voteState.down

  return {
    voteState,
    score,
    handleVote,
    setVoteState
  }
}