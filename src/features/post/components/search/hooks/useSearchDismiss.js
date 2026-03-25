import { useEffect } from "react";

const isWithinRef = (target, ref) => (
  target instanceof Node && ref.current?.contains(target)
)

export default function useSearchDismiss({
  isOpen,
  onClose,
  fieldRef,
  triggerRef,
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleDocumentKeyDown = (event) => {
      if (event.key !== "Escape") return

      event.preventDefault()
      onClose?.()
    }

    const handleDocumentPointerDown = (event) => {
      const target = event.target

      if (isWithinRef(target, fieldRef) || isWithinRef(target, triggerRef)) {
        return
      }

      onClose?.()
    }

    document.addEventListener("keydown", handleDocumentKeyDown)
    document.addEventListener("pointerdown", handleDocumentPointerDown)

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown)
      document.removeEventListener("pointerdown", handleDocumentPointerDown)
    }
  }, [fieldRef, isOpen, onClose, triggerRef])
}
