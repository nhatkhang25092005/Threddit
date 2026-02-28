import { useCallback } from "react";
import { reactionService } from "../../services/reaction.service";
import { reactionActions } from "../../store/actions";
import {useNotify} from '../../../../hooks/useNotify'
const normalizeReaction = (reaction) => {
  if (!reaction) return null;

  return String(reaction).toLowerCase();
};

export function useReaction(dispatch){
  const notify = useNotify()
  const reaction = useCallback(async (contentId, previousReact, nextReact) => {
    if (contentId == null) return null;

    const previous = normalizeReaction(previousReact);
    const next = normalizeReaction(nextReact);

    let res;
    if (!previous && next) {
      dispatch(reactionActions.setReaction(contentId, next))
      res = await reactionService.react(contentId, { type: next })
    } else if (previous === next) {
      dispatch(reactionActions.setReaction(contentId, null))
      res = await reactionService.unreact(contentId);
    } else {
      dispatch(reactionActions.setReaction(contentId, next))
      res = await reactionService.updateReaction(contentId, { type: next });
    }

    if (!res?.success) {
      notify.snackbar(res.message, 3000, 'error')
      dispatch(reactionActions.setReaction(contentId, previous));
    }

  }, [dispatch, notify]);

  return reaction
}
