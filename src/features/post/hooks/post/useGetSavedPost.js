import { useNotify } from '../../../../hooks/useNotify'
import { useRef, useCallback, useEffect } from 'react'
import { postService } from '../../services/post.service'
import { modal } from '../../../../constant/text/vi/modal'
import { combineActions, loadingAction, hasMoreActions } from '../../store/actions'
import { useSafeRequest } from '../../../../hooks/useSafeRequest'

export function useGetSavedPost(dispatch, hasMore) {
  const notify = useNotify()
  const cursor = useRef(null)
  const hasMoreRef = useRef(hasMore)
  const runRequest = useSafeRequest()

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  const getSavedPost = useCallback(async () => {
    if (hasMoreRef.current === false) return

    if (hasMoreRef.current === undefined) {
      dispatch(hasMoreActions.setSavedHasMore(true))
    }

    const response = await runRequest(
      (signal) =>
        notify.withLoading(
          () => postService.getSavedContent(cursor.current, signal),
          (bool) => dispatch(loadingAction.getSavedListLoading(bool))
        )
    )

    if (!response) return

    if (response.success) {
      cursor.current = response.data?.cursor

      if (!Array.isArray(response.data?.savedContents) || response.data.savedContents.length === 0) {
        dispatch(hasMoreActions.setSavedHasMore(false))
        return response
      }

      combineActions.getSavedPostListSuccess(dispatch, response.data.savedContents)
      return response
    }

    notify.popup(modal.title.error, response.message)
    return response
  }, [dispatch, notify, runRequest])

  return getSavedPost
}
