import { useEffect, useLayoutEffect, useRef } from "react";
import {
  readMainScrollTop,
  resolveMainScrollRoot,
} from "../../../../../components/layout/Main/mainScroll.utils";

const MAX_RESTORE_ATTEMPTS = 60
const SCROLL_TOLERANCE_PX = 2

const hasReachedTargetScroll = (scrollRoot, targetTop) => (
  Math.abs((scrollRoot?.scrollTop ?? 0) - targetTop) <= SCROLL_TOLERANCE_PX
)

let savedScrollTop = 0;

export default function useSaveScroll(enabled = false) {
  const hasRestoredScrollRef = useRef(false);

  useEffect(() => {
    return () => {
      savedScrollTop = readMainScrollTop();
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    if (hasRestoredScrollRef.current) return;

    if (savedScrollTop <= 0) return;

    let frameId = 0
    let restoreAttempts = 0

    const restoreScroll = () => {
      const scrollRoot = resolveMainScrollRoot()

      if (!scrollRoot) {
        frameId = window.requestAnimationFrame(restoreScroll)
        return
      }

      scrollRoot.scrollTo({
        top: savedScrollTop,
        left: 0,
        behavior: "auto",
      })

      restoreAttempts += 1

      if (hasReachedTargetScroll(scrollRoot, savedScrollTop)) {
        hasRestoredScrollRef.current = true
        return
      }

      if (restoreAttempts >= MAX_RESTORE_ATTEMPTS) {
        hasRestoredScrollRef.current = true
        return
      }

      frameId = window.requestAnimationFrame(restoreScroll)
    }

    frameId = window.requestAnimationFrame(restoreScroll)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [enabled]);
}
