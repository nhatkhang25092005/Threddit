import { useEffect } from "react";
import {
  WHEEL_COOLDOWN_MS,
  WHEEL_RESET_DELAY_MS,
  WHEEL_TRIGGER_THRESHOLD,
} from "./navigation.constants";
import {
  resolveNearestIndex,
  resolveScrollContainer,
  shouldIgnoreWheelNavigation,
} from "./navigationDom.utils";
import { clampIndex } from "./navigationMath.utils";

export default function useWheelReelNavigation({
  isAnimatingRef,
  itemCount,
  scrollToIndex,
  slotRefs,
  wheelCooldownUntilRef,
  wheelDeltaRef,
  wheelResetTimeoutRef,
}) {
  useEffect(() => {
    const firstSlot = slotRefs.current[0]
    if (!firstSlot || itemCount < 2) return undefined

    const scrollRoot = resolveScrollContainer(firstSlot)
    if (!scrollRoot) return undefined

    const resetWheelDelta = () => {
      wheelDeltaRef.current = 0
    }

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < 0.01) return

      if (shouldIgnoreWheelNavigation(event.target, scrollRoot)) {
        resetWheelDelta()
        window.clearTimeout(wheelResetTimeoutRef.current)
        return
      }

      event.preventDefault()

      if (isAnimatingRef.current || performance.now() < wheelCooldownUntilRef.current) {
        return
      }

      wheelDeltaRef.current += event.deltaY

      window.clearTimeout(wheelResetTimeoutRef.current)
      wheelResetTimeoutRef.current = window.setTimeout(
        resetWheelDelta,
        WHEEL_RESET_DELAY_MS,
      )

      if (Math.abs(wheelDeltaRef.current) < WHEEL_TRIGGER_THRESHOLD) return

      const direction = wheelDeltaRef.current > 0 ? 1 : -1
      const currentIndex = resolveNearestIndex(slotRefs.current, scrollRoot)
      const nextIndex = clampIndex(currentIndex + direction, itemCount)

      resetWheelDelta()

      if (nextIndex === currentIndex) {
        wheelCooldownUntilRef.current = performance.now() + WHEEL_COOLDOWN_MS
        return
      }

      scrollToIndex(nextIndex, scrollRoot)
    }

    scrollRoot.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      scrollRoot.removeEventListener("wheel", handleWheel)
      window.clearTimeout(wheelResetTimeoutRef.current)
      resetWheelDelta()
    }
  }, [
    isAnimatingRef,
    itemCount,
    scrollToIndex,
    slotRefs,
    wheelCooldownUntilRef,
    wheelDeltaRef,
    wheelResetTimeoutRef,
  ])
}
