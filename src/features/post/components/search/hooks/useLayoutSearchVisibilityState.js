import { useCallback, useState } from "react";

export default function useLayoutSearchVisibilityState({
  allowHoverSidebar,
  clearHoverTimer,
  collapseSidebar,
  expandSidebar,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(
    ({ collapse = false } = {}) => {
      clearHoverTimer?.()
      setIsOpen(false)

      if (collapse && allowHoverSidebar) {
        collapseSidebar?.()
      }
    },
    [allowHoverSidebar, clearHoverTimer, collapseSidebar]
  )

  const open = useCallback(() => {
    clearHoverTimer?.()

    if (allowHoverSidebar) {
      expandSidebar?.()
    }

    setIsOpen(true)
  }, [allowHoverSidebar, clearHoverTimer, expandSidebar])

  const toggle = useCallback(() => {
    if (isOpen) {
      close({ collapse: true })
      return
    }

    open()
  }, [close, isOpen, open])

  return {
    close,
    isOpen,
    open,
    setIsOpen,
    toggle,
  }
}
