import { DEFAULT_TEXT_LOCALE, getTextLocale } from "./config"

const VI_SOURCE_MODULES = import.meta.glob("../source/vi/**/*.js", { eager: true })
const EN_SOURCE_MODULES = import.meta.glob("../source/en/**/*.js", { eager: true })

const EMPTY_RECORD = {}
const bindingCache = new Map()

const SOURCE_MODULES = {
  vi: normalizeModules(VI_SOURCE_MODULES, "vi"),
  en: normalizeModules(EN_SOURCE_MODULES, "en"),
}

function normalizeModules(modules, locale) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, moduleExports]) => [
      path.replace(`../source/${locale}/`, ""),
      moduleExports,
    ])
  )
}

function toRecord(value) {
  if (value && (typeof value === "object" || typeof value === "function")) {
    return value
  }

  return EMPTY_RECORD
}

export function getLocaleModule(modulePath, locale = getTextLocale()) {
  return (
    SOURCE_MODULES[locale]?.[modulePath] ??
    SOURCE_MODULES[DEFAULT_TEXT_LOCALE]?.[modulePath] ??
    null
  )
}

export function getLocaleExport(modulePath, exportName, locale = getTextLocale()) {
  return getLocaleModule(modulePath, locale)?.[exportName]
}

export function createLocaleBinding(modulePath, exportName) {
  const cacheKey = `${modulePath}::${exportName}`

  if (bindingCache.has(cacheKey)) {
    return bindingCache.get(cacheKey)
  }

  const proxy = new Proxy(
    {},
    {
      get(_target, property) {
        const value = toRecord(getLocaleExport(modulePath, exportName))
        const nextValue = value[property]

        return typeof nextValue === "function" ? nextValue.bind(value) : nextValue
      },
      has(_target, property) {
        const value = toRecord(getLocaleExport(modulePath, exportName))
        return property in value
      },
      ownKeys() {
        const value = toRecord(getLocaleExport(modulePath, exportName))
        return Reflect.ownKeys(value)
      },
      getOwnPropertyDescriptor(_target, property) {
        const value = toRecord(getLocaleExport(modulePath, exportName))
        const descriptor = Object.getOwnPropertyDescriptor(value, property)

        if (!descriptor) {
          return undefined
        }

        return {
          ...descriptor,
          configurable: true,
        }
      },
    }
  )

  bindingCache.set(cacheKey, proxy)
  return proxy
}
