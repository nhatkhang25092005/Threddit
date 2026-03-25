import { useEffect } from "react";
import {
  resolveNearestIndex,
  resolveScrollContainer,
} from "./navigationDom.utils";

export default function useActiveReelSync({
  activeSyncFrameRef,
  itemCount,
  setActiveIndex,
  slotRefs,
}) {
  useEffect(() => {
    const firstSlot = slotRefs.current[0]
    if (!firstSlot || itemCount === 0) return undefined

    const scrollRoot = resolveScrollContainer(firstSlot)
    if (!scrollRoot) return undefined

    const syncActiveIndex = () => {
      const nextIndex = resolveNearestIndex(slotRefs.current, scrollRoot)
      setActiveIndex((currentValue) => (
        currentValue === nextIndex ? currentValue : nextIndex
      ))
    }

    const scheduleSync = () => {
      window.cancelAnimationFrame(activeSyncFrameRef.current)
      activeSyncFrameRef.current = window.requestAnimationFrame(syncActiveIndex)
    }

    syncActiveIndex()
    scrollRoot.addEventListener("scroll", scheduleSync, { passive: true })
    window.addEventListener("resize", scheduleSync)

    return () => {
      scrollRoot.removeEventListener("scroll", scheduleSync)
      window.removeEventListener("resize", scheduleSync)
      window.cancelAnimationFrame(activeSyncFrameRef.current)
    }
  }, [activeSyncFrameRef, itemCount, setActiveIndex, slotRefs])
}
