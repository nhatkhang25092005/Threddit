const resolveOwnerDocument = (ownerDocument) => {
  if (ownerDocument) return ownerDocument
  if (typeof document !== "undefined") return document
  return null
}

export const resolveMainScrollRoot = (ownerDocument = null) => (
  resolveOwnerDocument(ownerDocument)?.querySelector?.("main") ?? null
)

export const readMainScrollTop = (ownerDocument = null) => (
  resolveMainScrollRoot(ownerDocument)?.scrollTop ?? 0
)

export const scrollMainTo = ({
  behavior = "auto",
  left = 0,
  ownerDocument = null,
  top = 0,
} = {}) => {
  const scrollRoot = resolveMainScrollRoot(ownerDocument)

  if (!scrollRoot) return

  scrollRoot.scrollTo({
    top,
    left,
    behavior,
  })
}

export const scrollMainToTop = (ownerDocument = null) => {
  scrollMainTo({
    ownerDocument,
    top: 0,
    left: 0,
    behavior: "auto",
  })
}
