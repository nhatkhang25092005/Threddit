import { useNotify } from '../../../../hooks/useNotify'
import { useRef, useCallback, useEffect } from 'react'
import { postService } from '../../services/post.service'
import {modal} from '../../../../constant/text/vi/modal'
import { combineActions, loadingAction, hasMoreActions, postByIdActions, pinActions } from '../../store/actions'
import { useSafeRequest } from '../../../../hooks/useSafeRequest'
import { postByIdModel } from '../../store/models/postById.model'

function setData(dispatch, data, username){
  const posts = Array.isArray(data?.timelineItems) ? data.timelineItems : []
  const rawPins = data?.pinnedContents
  const pins = Array.isArray(rawPins)
    ? rawPins
    : (Array.isArray(rawPins?.post) ? rawPins.post : [])
  const pinnedPosts = pins.filter((item) => item && typeof item === "object")

  if (pinnedPosts.length > 0) {
    dispatch(postByIdActions.addPosts(pinnedPosts.map(postByIdModel)))
  }

  // set Pinned
  dispatch(pinActions.setPinnedList(username, pins, 'post'))
  // Set Post
  combineActions.getPostListSuccess(dispatch, username, posts)
}

export function useGetPostList (dispatch, hasMore) {
  const notify = useNotify()
  const cursor = useRef({}) // {[username] = cursor}
  const hasMoreRef = useRef(hasMore)
  const runRequest = useSafeRequest()

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  const getPostList = useCallback(async (username) => {
    if(hasMoreRef.current?.[username] === false) return

    dispatch(hasMoreActions.initHasMore(username))

    const r = await runRequest(
      (signal) => notify.withLoading(
        () => postService.getPostContent(username, cursor.current[username], signal),
        (bool) => dispatch(loadingAction.getPostListLoading(bool))
      )
    )

    if(!r) return

    if(r.success){
      cursor.current[username] = r.data.cursor
      if(!Array.isArray(r.data?.timelineItems) || r.data.timelineItems.length === 0){
        dispatch(hasMoreActions.setHasMoreFor(username, false))
        return
      }
      setData(dispatch, r.data, username)
    }
    else{
      notify.popup(modal.title.error, r.message)
    }
  },[dispatch, notify, runRequest])

  return getPostList
}
