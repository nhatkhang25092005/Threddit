import { useEffect, useMemo } from "react";
import type {
  SearchDismissRef,
  UseSearchDismissProps
} from '../types/UseSearchDismiss'

const EMPTY_REFS:SearchDismissRef[] = []

const isWithinRef = (target: EventTarget, ref?: SearchDismissRef) => (
  target instanceof Node && ref.current?.contains(target)
)

const isWithinAnyRef = (target: EventTarget | null, refs: SearchDismissRef[]) => (
  refs.some((ref) => isWithinRef(target, ref))
)

export default function useSearchDismiss({
  isOpen,
  onClose,
  fieldRef,
  refs = EMPTY_REFS,
  triggerRef,
}:UseSearchDismissProps) {
  const dismissRefs = useMemo(() => (
    refs.length > 0 ? refs : [fieldRef, triggerRef].filter(Boolean)
  ), [fieldRef, refs, triggerRef])

  useEffect(() => {
    if (!isOpen) return

    const close = () => {
      onClose?.()
    }

    const handleDocumentKeyDown = (event) => {
      if (event.key !== "Escape") return

      event.preventDefault()
      close()
    }

    const handleDocumentPointerDown = (event) => {
      if (isWithinAnyRef(event.target, dismissRefs)) {
        return
      }

      close()
    }

    document.addEventListener("keydown", handleDocumentKeyDown)
    document.addEventListener("pointerdown", handleDocumentPointerDown)

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown)
      document.removeEventListener("pointerdown", handleDocumentPointerDown)
    }
  }, [dismissRefs, isOpen, onClose])
}
