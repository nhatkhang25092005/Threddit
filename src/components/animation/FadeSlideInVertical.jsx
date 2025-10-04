import { Box } from "@mui/material";
import { useEffect, useState } from "react";
/**
 * FadeSlideInVertical
 *
 * A wrapper component that animates its children by fading in
 * and sliding upward on the Y-axis when mounted.
 *
 * ## Behavior:
 * - On first render, the content starts at:
 *   - `opacity: 0`
 *   - `transform: translateY(distance)`
 * - After mounting, it transitions to:
 *   - `opacity: 1`
 *   - `transform: translateY(0)`
 * - The animation only runs once on mount (no exit animation).
 * @param {*} param0
 * @returns
 */
export default function FadeSlideInVertical({
  duration = 800, //default duration of effect
  distance = 100,
  children,
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Box
      sx={(theme) => ({
        height:"100%",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : `translateY(${distance}px)`,
        transition: theme.transitions.create(["opacity", "transform"], {
          duration,
          easing: theme.transitions.easing.easeOut,
        }),
      })}
    >
      {children}
    </Box>
  );
}
