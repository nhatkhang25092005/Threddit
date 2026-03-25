import {
  ReelEmpty,
  ReelList,
  ReelLoading,
  ReelViewport,
} from "./components";
import { useEffect } from "react";
import { scrollMainToTop } from "../../../../components/layout/Main/mainScroll.utils";
import { useReelPageData } from "./hooks";

export default function Reel() {
  const {
    isLoadMore,
    loadMoreRef,
    message,
    reels,
    status,
  } = useReelPageData();

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      scrollMainToTop()
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <ReelViewport>
      {(status === "idle" || status === "loading") ? <ReelLoading /> : null}
      {status === "success" ? (
        <>
          <ReelList loadMoreRef={loadMoreRef} reels={reels} />
          {isLoadMore ? <ReelLoading count={1} /> : null}
        </>
      ) : null}
      {(status === "empty" || status === "error") ? (
        <ReelEmpty message={message} status={status} />
      ) : null}
    </ReelViewport>
  )
}
