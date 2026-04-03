export const TEXT_LOCALE = Object.freeze({
  VI: "vi",
  EN: "en",
})

export const DEFAULT_TEXT_LOCALE = TEXT_LOCALE.VI
export const TEXT_LOCALE_STORAGE_KEY = "threddit:text-locale"

const SUPPORTED_TEXT_LOCALES = new Set(Object.values(TEXT_LOCALE))

export function isSupportedTextLocale(locale) {
  return SUPPORTED_TEXT_LOCALES.has(locale)
}

export function getTextLocale() {
  if (typeof window === "undefined") {
    return DEFAULT_TEXT_LOCALE
  }

  const savedLocale = window.localStorage.getItem(TEXT_LOCALE_STORAGE_KEY)
  return isSupportedTextLocale(savedLocale) ? savedLocale : DEFAULT_TEXT_LOCALE
}

export function syncDocumentTextLocale() {
  if (typeof document === "undefined") {
    return
  }

  document.documentElement.lang = getTextLocale()
}

export function setTextLocale(locale) {
  const nextLocale = isSupportedTextLocale(locale) ? locale : DEFAULT_TEXT_LOCALE

  if (typeof window !== "undefined") {
    window.localStorage.setItem(TEXT_LOCALE_STORAGE_KEY, nextLocale)
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = nextLocale
  }

  return nextLocale
}

export function getNextTextLocale(locale = getTextLocale()) {
  return locale === TEXT_LOCALE.VI ? TEXT_LOCALE.EN : TEXT_LOCALE.VI
}

export function switchTextLocale(locale) {
  const nextLocale = setTextLocale(locale)

  if (typeof window !== "undefined") {
    window.location.reload()
  }

  return nextLocale
}

export function toggleTextLocale() {
  return switchTextLocale(getNextTextLocale())
}
