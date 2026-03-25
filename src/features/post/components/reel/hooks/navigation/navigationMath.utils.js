import {
  MAX_SCROLL_DURATION_MS,
  MIN_SCROLL_DURATION_MS,
  SCROLL_DURATION_FACTOR,
} from "./navigation.constants";

export const clampIndex = (value, itemCount) => {
  if (itemCount <= 0) return 0
  return Math.min(Math.max(value, 0), itemCount - 1)
}

export const easeInOutCubic = (value) => (
  value < 0.5
    ? 4 * value * value * value
    : 1 - (Math.pow(-2 * value + 2, 3) / 2)
)

export const resolveScrollDuration = (distance) => (
  Math.min(
    MAX_SCROLL_DURATION_MS,
    Math.max(MIN_SCROLL_DURATION_MS, Math.abs(distance) * SCROLL_DURATION_FACTOR),
  )
)
