import { useEffect, useRef, useState } from "react";

export default function useReelPlayback({
  isActive = false,
  isVideo = false,
  mediaUrl,
}) {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVideo) return undefined

    setProgress(0)
    setIsPaused(false)

    return undefined
  }, [isVideo, mediaUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!isVideo || !video) return undefined

    if (!isActive) {
      video.pause()
      video.currentTime = 0
      setIsPaused(false)
      setProgress(0)
      return undefined
    }

    if (isPaused) {
      video.pause()
      return undefined
    }

    const playPromise = video.play()

    if (typeof playPromise?.catch === "function") {
      playPromise.catch(() => {
        setIsPaused(true)
      })
    }

    return undefined
  }, [isActive, isPaused, isVideo, mediaUrl])

  const handleTogglePlayback = (event) => {
    event?.stopPropagation?.()
    if (!isVideo || !isActive) return

    setIsPaused((currentValue) => !currentValue)
  }

  const handleToggleMuted = (event) => {
    event.stopPropagation()
    setIsMuted((currentValue) => !currentValue)
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video?.duration) {
      setProgress(0)
      return
    }

    setProgress((video.currentTime / video.duration) * 100)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video?.duration) {
      setProgress(0)
      return
    }

    setProgress((video.currentTime / video.duration) * 100)
  }

  const handleProgressSeek = (event) => {
    event.stopPropagation()

    const video = videoRef.current
    if (!isActive || !video?.duration) return

    const { left, width } = event.currentTarget.getBoundingClientRect()
    if (!width) return

    const nextRatio = Math.min(Math.max((event.clientX - left) / width, 0), 1)
    video.currentTime = video.duration * nextRatio
    setProgress(nextRatio * 100)
  }

  return {
    handleLoadedMetadata,
    handleProgressSeek,
    handleTimeUpdate,
    handleToggleMuted,
    handleTogglePlayback,
    isMuted,
    isPaused,
    progress,
    videoRef,
  }
}
