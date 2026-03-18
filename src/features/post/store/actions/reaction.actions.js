import { createAction } from "../models/action.model";
import { CLASS_TYPE, REACTION } from "../type";

export const reactionActions = {
  setReaction: (id, reaction) => (
    createAction(
      CLASS_TYPE.REACTION,
      REACTION.SET_POST_REACTION,
      { id, reaction }
    )
  ),

  setCommentReaction: (id, reaction) => (
    createAction(
      CLASS_TYPE.REACTION,
      REACTION.SET_COMMENT_REACTION,
      { id, reaction }
    )
  ),
}
