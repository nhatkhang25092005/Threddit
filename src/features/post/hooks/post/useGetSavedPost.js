import { useNotify } from '../../../../hooks/useNotify'
import { useRef, useCallback } from 'react'
import { postService } from '../../services/post.service'
import { modal } from '../../../../constant/text/vi/modal'
import { combineActions, loadingAction, hasMoreActions } from '../../store/actions'
import { useSafeRequest } from '../../../../hooks/useSafeRequest'

export function useGetSavedPost(dispatch, hasMore) {
  const notify = useNotify()
  const cursor = useRef({}) // {[username] = cursor}
  const runRequest = useSafeRequest()

  const getSavedPost = useCallback(async (username) => {
    const key = username || 'savedPost'
    if (hasMore?.[key] === false) return

    const r = await runRequest(
      (signal) =>
        notify.withLoading(
          () => postService.getSavedContent(cursor.current[key], signal),
          (bool) => dispatch(loadingAction.getPostListLoading(bool))
        )
    )

    if (!r) return

    if (r.success) {
      cursor.current[key] = r.data.cursor
      if (!Array.isArray(r.data?.timelineItems) || r.data.timelineItems.length === 0) {
        dispatch(hasMoreActions.setSavedHasMore(false))
        return
      }
      combineActions.getPostListSuccess(dispatch, key, r.data.timelineItems)
    } else {
      notify.popup(modal.title.error, r.message)
    }
  }, [dispatch, notify, hasMore, runRequest])

  return getSavedPost
}
