import { useCallback, useEffect, useRef } from "react";
import { modal } from "../../../../constant/text/vi/modal";
import { useSafeRequest } from "../../../../hooks/useSafeRequest";
import { useNotify } from "../../../../hooks/useNotify";
import { postService } from "../../services";
import {
  combineActions,
  hasMoreActions,
  loadingAction,
} from "../../store/actions";
import { postByIdModel } from "../../store/models/postById.model";

const resolveReelItems = (data) => {
  if (Array.isArray(data?.reels)) return data.reels
  if (Array.isArray(data?.reelItems)) return data.reelItems
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.contents)) return data.contents
  if (Array.isArray(data)) return data
  return []
}

const resolveReelHasMore = (data, reelItems = []) => {
  if (reelItems.length === 0) return false

  if (typeof data?.hasMore === "boolean") return data.hasMore
  if (typeof data?.pagination?.hasMore === "boolean") {
    return data.pagination.hasMore
  }

  return reelItems.length > 0
}

const normalizeReelItem = (item) => ({
  ...item,
  type: item?.type || "reel",
})

const resolveIncomingReelIds = (reelItems = []) => (
  (Array.isArray(reelItems) ? reelItems : [])
    .map((item) => postByIdModel(normalizeReelItem(item))?.id)
    .filter((id) => id != null)
)

const filterUniqueReelItems = (reelItems = [], currentReelIds = []) => {
  const currentIdSet = new Set(currentReelIds)
  const nextIdSet = new Set()

  return (Array.isArray(reelItems) ? reelItems : []).filter((item) => {
    const reelId = postByIdModel(normalizeReelItem(item))?.id

    if (reelId == null || currentIdSet.has(reelId) || nextIdSet.has(reelId)) {
      return false
    }

    nextIdSet.add(reelId)
    return true
  })
}

export function useGetReel(dispatch, hasMore, currentReelIds = []){
  const runRequest = useSafeRequest()
  const notify = useNotify()
  const hasMoreRef = useRef(hasMore)
  const currentReelIdsRef = useRef(currentReelIds)
  const pendingRef = useRef(false)

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  useEffect(() => {
    currentReelIdsRef.current = currentReelIds
  }, [currentReelIds])

  const getReel = useCallback(async ()=>{
    if (hasMoreRef.current === false || pendingRef.current) return null

    if (hasMoreRef.current === undefined) {
      hasMoreRef.current = true
      dispatch(hasMoreActions.setReelHasMore(true))
    }

    pendingRef.current = true

    try {
      const response = await runRequest(
        (signal) =>
          notify.withLoading(
            () => postService.getReel(signal),
            (isLoading) => dispatch(loadingAction.getReelListLoading(isLoading))
          )
      )

      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return response
      }

      const data = response.data || {}
      const reelItems = resolveReelItems(data)
      const nextReelItems = filterUniqueReelItems(
        reelItems,
        currentReelIdsRef.current
      )
      const incomingReelIds = resolveIncomingReelIds(nextReelItems)
      const isDuplicateBatch =
        reelItems.length > 0 &&
        incomingReelIds.length === 0
      const nextHasMore = isDuplicateBatch
        ? false
        : resolveReelHasMore(data, nextReelItems)

      hasMoreRef.current = nextHasMore
      dispatch(hasMoreActions.setReelHasMore(nextHasMore))

      if (nextReelItems.length > 0) {
        combineActions.getReelSuccess(dispatch, nextReelItems)
      }

      return {
        ...response,
        data: {
          ...data,
          hasMore: nextHasMore,
          reelItems: nextReelItems,
        },
      }
    } finally {
      pendingRef.current = false
    }
  },[dispatch, notify, runRequest])

  return getReel
}
