import type { RefObject } from "react"
export type SearchDismissRef = RefObject<Element | null>

export interface UseSearchDismissProps{
  isOpen:boolean
  onClose?:() => void
  fieldRef?:SearchDismissRef
  triggerRef?:SearchDismissRef
  refs?:SearchDismissRef[]
}