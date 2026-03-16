import { useNotify } from '../../../../hooks/useNotify'
import { useRef, useCallback, useEffect } from 'react'
import { postService } from '../../services/post.service'
import {modal} from '../../../../constant/text/vi/modal'
import { combineActions, loadingAction, hasMoreActions, postByIdActions, pinActions, userPostActions } from '../../store/actions'
import { useSafeRequest } from '../../../../hooks/useSafeRequest'
import { postByIdModel } from '../../store/models/postById.model'
import { getPostList as getPostIdList } from '../../utils/getPostList'

function setData(dispatch, data, username, mode = 'append'){
  const posts = Array.isArray(data?.timelineItems) ? data.timelineItems : []
  const rawPins = data?.pinnedContents
  const pins = Array.isArray(rawPins)
    ? rawPins
    : (Array.isArray(rawPins?.post) ? rawPins.post : [])
  const pinnedPosts = pins.filter((item) => item && typeof item === "object")
  const postByIdList = posts.map(postByIdModel)

  if (pinnedPosts.length > 0) {
    dispatch(postByIdActions.addPosts(pinnedPosts.map(postByIdModel)))
  }

  // set Pinned
  dispatch(pinActions.setPinnedList(username, pins, 'post'))

  if (mode === 'replace') {
    dispatch(postByIdActions.addPosts(postByIdList))
    dispatch(userPostActions.setTimelineIndex(username, getPostIdList(postByIdList)))
    return
  }

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

  const getPostList = useCallback(async (username, options = {}) => {
    const {
      ignoreHasMore = false,
      replace = false,
      resetCursor = false
    } = options

    if (!username) return
    if(resetCursor){
      cursor.current[username] = undefined
      dispatch(hasMoreActions.setHasMoreFor(username, true))
    }
    if(!ignoreHasMore && hasMoreRef.current?.[username] === false) return

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
        if (replace) {
          dispatch(userPostActions.setTimelineIndex(username, []))
        }
        dispatch(hasMoreActions.setHasMoreFor(username, false))
        return
      }
      setData(dispatch, r.data, username, replace ? 'replace' : 'append')
    }
    else{
      notify.popup(modal.title.error, r.message)
    }
  },[dispatch, notify, runRequest])

  const refreshUserPostList = useCallback(
    (username) => getPostList(username, {
      ignoreHasMore: true,
      replace: true,
      resetCursor: true
    }),
    [getPostList]
  )

  return {
    getPostList,
    refreshUserPostList
  }
}
