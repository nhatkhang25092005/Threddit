import { createAction } from "../models/action.model";
import { CLASS_TYPE, REACTION } from "../type";

export const reactionActions = {
  setReaction: (contentId, reaction) => (
    createAction(
      CLASS_TYPE.REACTION,
      REACTION.SET_POST_REACTION,
      { contentId, reaction }
    )
  ),
}
