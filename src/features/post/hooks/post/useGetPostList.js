import { useNotify } from '../../../../hooks/useNotify'
import { useRef, useCallback } from 'react'
import { postService } from '../../services/post.service'
import {modal} from '../../../../constant/text/vi/modal'
import { combineActions, loadingAction, hasMoreActions } from '../../store/actions'
import { useHandleGetList } from '../../../../hooks/useHandleGetList'
export function useGetPostList (dispatch, hasMore) {
  const notify = useNotify()
  const cursor = useRef({}) // {[username] = cursor}
  const runRequest = useHandleGetList()

  const getPostList = useCallback(async (username) => {
    if(hasMore?.[username] === false) return

    dispatch(hasMoreActions.initHasMore(username))

    const r = await runRequest(
      (signal) => notify.withLoading(
        () => postService.getTimelineContent(username, cursor.current[username], signal),
        (bool) => dispatch(loadingAction.getPostListLoading(bool))
      )
    )

    if(!r) return

    if(r.success){
      cursor.current[username] = r.data.cursor
      if(r.data.timelineItems.length == 0){
        dispatch(hasMoreActions.setHasMoreFor(username, false))
        return
      }
      combineActions.getPostListSuccess(dispatch, username, r.data.timelineItems)
    }
    else{
      notify.popup(modal.title.error, r.message)
    }
  },[dispatch, notify, hasMore, runRequest])

  return getPostList
}
