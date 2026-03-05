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
  const reaction = useCallback(async (id, previousReact, nextReact) => {
    if (id == null) return null;

    const previous = normalizeReaction(previousReact);
    const next = normalizeReaction(nextReact);

    let res;
    if (!previous && next) {
      dispatch(reactionActions.setReaction(id, next))
      res = await reactionService.react(id, { type: next })
    } else if (previous === next) {
      dispatch(reactionActions.setReaction(id, null))
      res = await reactionService.unreact(id);
    } else {
      dispatch(reactionActions.setReaction(id, next))
      res = await reactionService.updateReaction(id, { type: next });
    }

    if (!res?.success) {
      notify.snackbar(res.message, 3000, 'error')
      dispatch(reactionActions.setReaction(id, previous));
    }

  }, [dispatch, notify]);

  return reaction
}
