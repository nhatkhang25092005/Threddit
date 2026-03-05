import { useCallback, useEffect, useRef, useState } from 'react'

export function useHorizontalScroll(distanceOrRef, gapBetweenItems = 0) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const getDistance = useCallback(() => {
    if (typeof distanceOrRef === 'number') return distanceOrRef

    if (distanceOrRef && typeof distanceOrRef === 'object' && 'current' in distanceOrRef) {
      const refValue = distanceOrRef.current
      if (typeof refValue === 'number') return refValue

      if (refValue && typeof refValue.getBoundingClientRect === 'function') {
        return refValue.getBoundingClientRect().width
      }
    }

    return 0
  }, [distanceOrRef])

  const updateScrollState = useCallback(() => {
    const node = scrollRef.current
    if (!node) return

    const maxScrollLeft = Math.max(0, node.scrollWidth - node.clientWidth)
    setCanScrollLeft(node.scrollLeft > gapBetweenItems)
    setCanScrollRight(maxScrollLeft - node.scrollLeft > gapBetweenItems)
  }, [gapBetweenItems])

  const scrollStories = useCallback((direction) => {
    const node = scrollRef.current
    if (!node) return

    const distance = getDistance()
    if (distance <= 0) return

    const amount = distance + gapBetweenItems/2
    node.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }, [gapBetweenItems, getDistance])

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return

    updateScrollState()
    node.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      node.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollStories,
  }
}
