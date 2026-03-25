const isScrollableY = (node) => {
  const { overflowY } = window.getComputedStyle(node)

  return (
    (overflowY === "auto" || overflowY === "overlay" || overflowY === "scroll")
    && node.scrollHeight > node.clientHeight
  )
}

export const shouldIgnoreWheelNavigation = (target, scrollRoot) => {
  let currentNode = target instanceof Element ? target : null

  while (currentNode && currentNode !== scrollRoot) {
    if (
      currentNode instanceof HTMLElement
      && currentNode.dataset?.reelWheelLock === "true"
    ) {
      return true
    }

    if (currentNode instanceof HTMLElement && isScrollableY(currentNode)) {
      return true
    }

    currentNode = currentNode.parentElement
  }

  return false
}

export const resolveScrollContainer = (node) => {
  let currentNode = node?.parentElement ?? null

  while (currentNode) {
    if (isScrollableY(currentNode)) {
      return currentNode
    }

    currentNode = currentNode.parentElement
  }

  return document.scrollingElement || document.documentElement
}

export const resolveElementTop = (element, scrollRoot) => {
  const containerRect = typeof scrollRoot.getBoundingClientRect === "function"
    ? scrollRoot.getBoundingClientRect()
    : { top: 0 }

  return element.getBoundingClientRect().top - containerRect.top + scrollRoot.scrollTop
}

export const resolveNearestIndex = (elements, scrollRoot) => {
  const currentTop = scrollRoot.scrollTop
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  elements.forEach((element, index) => {
    if (!element) return

    const distance = Math.abs(resolveElementTop(element, scrollRoot) - currentTop)

    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = index
    }
  })

  return nearestIndex
}
