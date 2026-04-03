import { useCallback } from "react"
import {
  getNextTextLocale,
  getTextLocale,
  toggleTextLocale,
} from "./config"

export function useTextLocale() {
  const locale = getTextLocale()
  const nextLocale = getNextTextLocale(locale)

  const handleToggleLocale = useCallback(() => {
    toggleTextLocale()
  }, [])

  return {
    locale,
    nextLocale,
    toggleLocale: handleToggleLocale,
  }
}
