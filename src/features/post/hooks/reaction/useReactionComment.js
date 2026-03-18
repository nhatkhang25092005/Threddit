import { useCallback } from "react";
import { useNotify } from "../../../../hooks/useNotify";
import { reactionService } from "../../services/reaction.service";
import { reactionActions } from "../../store/actions";

const normalizeReaction = (reaction) => {
  if (!reaction) return null;

  return String(reaction).toLowerCase();
};

export function useReactionComment(dispatch) {
  const notify = useNotify();

  const reactionComment = useCallback(async (id, previousReact, nextReact) => {
    if (id == null) return null;

    const previous = normalizeReaction(previousReact);
    const next = normalizeReaction(nextReact);

    let response;

    if (!previous && next) {
      dispatch(reactionActions.setCommentReaction(id, next));
      response = await reactionService.reactComment(id, { type: next });
    } else if (previous === next) {
      dispatch(reactionActions.setCommentReaction(id, null));
      response = await reactionService.unReactComment(id);
    } else {
      dispatch(reactionActions.setCommentReaction(id, next));
      response = await reactionService.updateReactComment(id, { type: next });
    }

    if (!response?.success) {
      notify.snackbar(response?.message, 3000, "error");
      dispatch(reactionActions.setCommentReaction(id, previous));
    }

    return response;
  }, [dispatch, notify]);

  return reactionComment;
}
