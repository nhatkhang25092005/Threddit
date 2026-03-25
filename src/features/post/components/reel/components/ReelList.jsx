import { Box } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePostContext } from "../../../hooks/usePostContext";
import { useReelNavigation } from "../hooks";
import { style } from "../style";
import ReelCard from "./ReelCard";
import ReelCommentSidebar from "./ReelCommentSidebar";

export default function ReelList({ loadMoreRef = null, reels = [] }) {
  const {
    actions: { prefetchCommentThread },
  } = usePostContext()
  const { activeIndex, scrollToIndex, setSlotRef } = useReelNavigation(reels.length)
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(false)
  const [commentCounts, setCommentCounts] = useState({})
  const [commentThreadStatusByReelId, setCommentThreadStatusByReelId] = useState({})
  const pendingPrefetchIdsRef = useRef({})

  useEffect(() => {
    setCommentCounts((currentValue) => {
      const nextValue = {}
      let hasChanged = false

      reels.forEach((reel) => {
        const knownCount = currentValue[reel.id]
        const fallbackCount = reel?.stats?.commentNumber ?? 0
        const nextCount = typeof knownCount === "number" ? knownCount : fallbackCount

        nextValue[reel.id] = nextCount
        if (currentValue[reel.id] !== nextCount) {
          hasChanged = true
        }
      })

      if (Object.keys(currentValue).length !== reels.length) {
        hasChanged = true
      }

      return hasChanged ? nextValue : currentValue
    })
  }, [reels])

  const handleToggleCommentPanel = useCallback(() => {
    setIsCommentPanelOpen((currentValue) => !currentValue)
  }, [])
  const handleCloseCommentPanel = useCallback(() => {
    setIsCommentPanelOpen(false)
  }, [])
  const activeReel = activeIndex >= 0 ? reels[activeIndex] ?? null : null
  const activeReelId = activeReel?.id ?? null
  const activeCommentThreadStatus = activeReelId == null
    ? undefined
    : commentThreadStatusByReelId[activeReelId]

  useEffect(() => {
    if (!isCommentPanelOpen || typeof prefetchCommentThread !== "function" || activeReelId == null) {
      return
    }

    if (
      activeCommentThreadStatus === "loading" ||
      activeCommentThreadStatus === "done" ||
      activeCommentThreadStatus === "error" ||
      pendingPrefetchIdsRef.current[activeReelId]
    ) {
      return
    }

    pendingPrefetchIdsRef.current[activeReelId] = true
    setCommentThreadStatusByReelId((currentValue) => (
      currentValue[activeReelId] === "loading"
        ? currentValue
        : {
          ...currentValue,
          [activeReelId]: "loading",
        }
    ))

    const prefetchActiveReelComments = async () => {
      const response = await prefetchCommentThread(activeReelId)

      delete pendingPrefetchIdsRef.current[activeReelId]

      setCommentThreadStatusByReelId((currentValue) => {
        const nextStatus = response?.success ? "done" : "error"

        if (currentValue[activeReelId] === nextStatus) {
          return currentValue
        }

        return {
          ...currentValue,
          [activeReelId]: nextStatus,
        }
      })
    }

    prefetchActiveReelComments()
  }, [activeCommentThreadStatus, activeReelId, isCommentPanelOpen, prefetchCommentThread])

  const handleCommentCountChange = useCallback((reelId, nextCount) => {
    if (!reelId) return

    setCommentCounts((currentValue) => {
      if (currentValue[reelId] === nextCount) return currentValue

      return {
        ...currentValue,
        [reelId]: nextCount,
      }
    })
  }, [])

  return (
    <Box sx={style.list}>
      {reels.map((reel, index) => (
        <Box
          key={reel.id}
          ref={(node) => {
            setSlotRef(index, node)

            if (index === reels.length - 1 && typeof loadMoreRef === "function") {
              loadMoreRef(node)
            }
          }}
          sx={style.screenSlot}
        >
          <Box
            sx={[
              style.screenSlotInner,
              isCommentPanelOpen
                ? style.screenSlotInnerCommentOpen
                : null,
            ]}
          >
            <ReelCard
              canNavigateNext={index < reels.length - 1}
              canNavigatePrev={index > 0}
              commentCount={commentCounts[reel.id] ?? reel?.stats?.commentNumber ?? 0}
              isCommentPanelOpen={isCommentPanelOpen}
              isActive={index === activeIndex}
              onNavigateNext={() => scrollToIndex(index + 1)}
              onNavigatePrev={() => scrollToIndex(index - 1)}
              onToggleCommentPanel={handleToggleCommentPanel}
              reel={reel}
            />
          </Box>
        </Box>
      ))}

      <ReelCommentSidebar
        isCommentPrefetched={activeCommentThreadStatus === "done"}
        isCommentPrefetching={activeCommentThreadStatus === "loading"}
        isOpen={isCommentPanelOpen}
        onClose={handleCloseCommentPanel}
        onCommentCountChange={handleCommentCountChange}
        reel={activeReel}
      />
    </Box>
  )
}
