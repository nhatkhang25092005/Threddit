import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { style } from "../style";

export default function ReelMeta({ text }) {
  const safeText = typeof text === "string" ? text.trim() : ""
  const captionRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    setIsExpanded(false)
  }, [safeText])

  useEffect(() => {
    if (!safeText) return undefined

    const captionElement = captionRef.current
    if (!captionElement) return undefined

    const syncOverflowState = () => {
      const isContentOverflowing = captionElement.scrollHeight - captionElement.clientHeight > 1
      setIsOverflowing(isContentOverflowing)
    }

    const frameId = window.requestAnimationFrame(syncOverflowState)
    const resizeObserver = typeof ResizeObserver === "function"
      ? new ResizeObserver(syncOverflowState)
      : null

    resizeObserver?.observe(captionElement)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
    }
  }, [safeText, isExpanded])

  if (!safeText) return null

  return (
    <Box sx={style.meta}>
      <Typography
        ref={captionRef}
        sx={[
          style.caption,
          !isExpanded ? style.captionCollapsed : null,
        ]}
      >
        {safeText}
      </Typography>

      {isOverflowing ? (
        <Box
          aria-expanded={isExpanded}
          component="button"
          onClick={(event) => {
            event.stopPropagation()
            setIsExpanded((currentValue) => !currentValue)
          }}
          sx={style.captionToggle}
          type="button"
        >
          {isExpanded ? "An bot" : "Xem them"}
        </Box>
      ) : null}
    </Box>
  )
}
