import {style} from './style'
import {Box, ButtonBase, Typography} from '@mui/material'
import { useState, useCallback, useEffect, useRef } from 'react';
import { REACTION_META } from '../../../../constant/emoji';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReactionBar from './ReactionBar'
import { usePostContext } from '../../hooks';
const OPEN_DELAY = 300
const CLOSE_DELAY = 120
const sx = style.reaction

const normalizeReaction = (reaction) => {
  if (!reaction) return null;

  const key = String(reaction).toUpperCase();
  return REACTION_META[key] ? key : null;
}

function useReaction(onReaction, postId,  selectedReaction = null){
  const [isReactionOpen, setIsReactionOpen] = useState(false)
  const timeoutRef = useRef(null)

  const clearTimeoutRef = useCallback(()=>{
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current)
      timeoutRef.current= null
    }
  },[])

  useEffect(() => () => clearTimeoutRef(), [clearTimeoutRef])

  const openReaction = useCallback(() => {
    clearTimeoutRef()
    timeoutRef.current = setTimeout(() => {
      setIsReactionOpen(true)
      timeoutRef.current = null
    }, OPEN_DELAY)
  },[clearTimeoutRef])

  const keepReactionOpen = useCallback(() => {
    clearTimeoutRef()
    setIsReactionOpen(true)
  }, [clearTimeoutRef])

  const closeReaction = useCallback(() => {
    clearTimeoutRef()
    timeoutRef.current = setTimeout(() => {
      setIsReactionOpen(false)
      timeoutRef.current = null
    }, CLOSE_DELAY)
  },[clearTimeoutRef])

  const handleReact = useCallback((reactionType)=>{
    clearTimeoutRef()
    onReaction(postId, selectedReaction, normalizeReaction(reactionType))
    setIsReactionOpen(false)
  },[clearTimeoutRef, onReaction, postId, selectedReaction])

  return{
    state:{
      isReactionOpen
    },
    controller:{
      openReaction,
      keepReactionOpen,
      closeReaction,
      handleReact
    }
  }
}

export default function ReactionButton({postId}){
  const {actions:{reaction}, selector} = usePostContext()
  const selectedReaction =normalizeReaction(selector.reaction.getMyReactionOf(postId))
  const selectedReactionMeta = selectedReaction ? REACTION_META[selectedReaction] : null

  const {
    state:{
      isReactionOpen
    },
    controller:{
      openReaction,
      keepReactionOpen,
      closeReaction,
      handleReact
    }
  } = useReaction(reaction, postId, selectedReaction)

  return(
    <Box sx={sx.likeActionWrap} onMouseEnter={openReaction} onMouseLeave={closeReaction}>
      <ButtonBase sx={{ ...sx.actionBtn, width: "100%" }} onClick={()=>handleReact(selectedReaction || "LIKE")}>
        {selectedReactionMeta ? (
          <>
            <Box component="span" sx={sx.selectedReactionEmoji}>
              {selectedReactionMeta.emoji}
            </Box>
            <Box component="span" sx={{ color: selectedReactionMeta.color }}>
              {selectedReactionMeta.label}
            </Box>
          </>
        ) : (
          <Box sx={{display:'flex', alignItems:'center'}}>
            <ThumbUpAltIcon sx={sx.actionIcon} />
            <Typography fontSize='0.9rem' color='white'>Thích</Typography>
          </Box>
        )}
      </ButtonBase>

      {isReactionOpen && (
        <Box sx={sx.reactionPopover}>
          <ReactionBar onReact={handleReact} onMouseEnter={keepReactionOpen} onMouseLeave={closeReaction} />
        </Box>
      )}
    </Box>
  )
}
