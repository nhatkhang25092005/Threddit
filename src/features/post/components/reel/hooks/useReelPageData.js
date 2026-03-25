import { useEffect, useState } from "react";
import useInfiniteScroll from "../../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../../hooks/usePostContext";

const DEFAULT_ERROR_MESSAGE = "Khong the tai danh sach reel luc nay."

const createInitialRequestState = (hasReels = false) => ({
  hasRequested: hasReels,
  message: "",
  status: hasReels ? "success" : "idle",
})

export default function useReelPageData() {
  const {
    actions: { getReel },
    selector: {
      loading: { getReelFetchingLoading },
      post: { getReelList, getReelListHasMore },
    },
  } = usePostContext()
  const reels = getReelList()
  const hasMore = getReelListHasMore()
  const isLoading = getReelFetchingLoading()
  const [requestState, setRequestState] = useState(() => (
    createInitialRequestState(reels.length > 0)
  ))

  useEffect(() => {
    if (reels.length === 0) return

    setRequestState((previousState) => {
      if (previousState.status === "success" && previousState.hasRequested) {
        return previousState
      }

      return {
        ...previousState,
        hasRequested: true,
        status: "success",
      }
    })
  }, [reels.length])

  useEffect(() => {
    if (typeof getReel !== "function") {
      setRequestState({
        hasRequested: true,
        message: DEFAULT_ERROR_MESSAGE,
        status: "error",
      })
      return
    }

    if (reels.length > 0 || isLoading || requestState.hasRequested) return

    let isMounted = true
    let frameId = null

    const fetchReels = async () => {
      setRequestState((previousState) => ({
        ...previousState,
        status: "loading",
      }))

      const response = await getReel()

      if (!isMounted) return

      const resolvedItems = Array.isArray(response?.data?.reelItems)
        ? response.data.reelItems
        : []
      const isSuccess = Boolean(response?.success)

      setRequestState({
        hasRequested: true,
        message: response?.message || (isSuccess ? "" : DEFAULT_ERROR_MESSAGE),
        status: isSuccess
          ? (resolvedItems.length > 0 ? "success" : "empty")
          : "error",
      })
    }

    frameId = window.requestAnimationFrame(() => {
      fetchReels()
    })

    return () => {
      isMounted = false
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [getReel, isLoading, reels.length, requestState.hasRequested])

  const loadMoreRef = useInfiniteScroll({
    hasMore: Boolean(hasMore) && reels.length > 0,
    loading: isLoading,
    onLoadMore: getReel,
    rootMargin: "0px",
    threshold: 0.6,
  })

  const status = reels.length > 0
    ? "success"
    : ((isLoading && requestState.status !== "error")
      ? "loading"
      : requestState.status)

  return {
    hasMore,
    isLoadMore: reels.length > 0 && isLoading,
    loadMoreRef,
    message: requestState.message,
    reels,
    status,
  }
}
