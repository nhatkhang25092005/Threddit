import { useCallback, useEffect, useRef, useState } from "react";
import { WHEEL_COOLDOWN_MS } from "./navigation.constants";
import {
  resolveElementTop,
  resolveScrollContainer,
} from "./navigationDom.utils";
import {
  clampIndex,
  easeInOutCubic,
  resolveScrollDuration,
} from "./navigationMath.utils";
import useActiveReelSync from "./useActiveReelSync";
import useWheelReelNavigation from "./useWheelReelNavigation";

export default function useReelNavigation(itemCount = 0) {
  const [activeIndex, setActiveIndex] = useState(0)
  const slotRefs = useRef([])
  const animationFrameRef = useRef(0)
  const activeSyncFrameRef = useRef(0)
  const wheelResetTimeoutRef = useRef(0)
  const wheelDeltaRef = useRef(0)
  const wheelCooldownUntilRef = useRef(0)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    slotRefs.current = slotRefs.current.slice(0, itemCount)
    setActiveIndex((currentValue) => clampIndex(currentValue, itemCount))
  }, [itemCount])

  useEffect(() => () => {
    window.cancelAnimationFrame(animationFrameRef.current)
    window.cancelAnimationFrame(activeSyncFrameRef.current)
    window.clearTimeout(wheelResetTimeoutRef.current)
  }, [])

  const scrollToIndex = useCallback((nextIndex, providedScrollRoot = null) => {
    if (itemCount <= 0) return

    const targetIndex = clampIndex(nextIndex, itemCount)
    const targetElement = slotRefs.current[targetIndex]
    if (!targetElement) return

    const scrollRoot = providedScrollRoot || resolveScrollContainer(targetElement)
    if (!scrollRoot) return

    const startTop = scrollRoot.scrollTop
    const targetTop = resolveElementTop(targetElement, scrollRoot)
    const distance = targetTop - startTop

    if (Math.abs(distance) < 2) {
      setActiveIndex(targetIndex)
      return
    }

    const duration = resolveScrollDuration(distance)
    const startTime = performance.now()

    window.cancelAnimationFrame(animationFrameRef.current)
    isAnimatingRef.current = true
    setActiveIndex(targetIndex)

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)

      scrollRoot.scrollTo({
        top: startTop + (distance * easedProgress),
        left: 0,
        behavior: "auto",
      })

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step)
        return
      }

      isAnimatingRef.current = false
      wheelCooldownUntilRef.current = performance.now() + WHEEL_COOLDOWN_MS
    }

    animationFrameRef.current = window.requestAnimationFrame(step)
  }, [itemCount])

  const setSlotRef = useCallback((index, node) => {
    slotRefs.current[index] = node
  }, [])

  useActiveReelSync({
    activeSyncFrameRef,
    itemCount,
    setActiveIndex,
    slotRefs,
  })

  useWheelReelNavigation({
    isAnimatingRef,
    itemCount,
    scrollToIndex,
    slotRefs,
    wheelCooldownUntilRef,
    wheelDeltaRef,
    wheelResetTimeoutRef,
  })

  return {
    activeIndex,
    scrollToIndex,
    setSlotRef,
  }
}
