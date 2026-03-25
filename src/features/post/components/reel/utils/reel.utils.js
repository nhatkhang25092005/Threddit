const toArray = (value) => (Array.isArray(value) ? value : [])

const normalizeMediaType = (type = "") => String(type || "").toLowerCase()

export const isVideoMedia = (media) => (
  normalizeMediaType(media?.type || media?.contentType).startsWith("video")
)

export const isImageMedia = (media) => {
  const type = normalizeMediaType(media?.type || media?.contentType)
  return type.startsWith("image") || type === "img" || type === "photo"
}

export const resolveVisualMedia = (mediaFiles = []) => (
  toArray(mediaFiles)
    .filter((item) => item?.url)
    .filter((item) => isVideoMedia(item) || isImageMedia(item))
    .sort((a, b) => {
      const aOrder = Number.isFinite(a?.sortOrder) ? a.sortOrder : Number.MAX_SAFE_INTEGER
      const bOrder = Number.isFinite(b?.sortOrder) ? b.sortOrder : Number.MAX_SAFE_INTEGER
      return aOrder - bOrder
    })
)

export const resolvePrimaryMedia = (mediaFiles = []) => (
  resolveVisualMedia(mediaFiles)[0] ?? null
)

export const resolveAvatarUrl = (value) => {
  if (typeof value !== "string") return ""
  if (!value.trim()) return ""
  if (value.startsWith("undefined")) return ""
  return value
}

export const resolveProfileUsername = (value) => {
  if (typeof value !== "string") return ""

  return value.trim().replace(/^@+/, "")
}

export const resolveProfileHandle = (value) => {
  const username = resolveProfileUsername(value)
  return username ? `@${username}` : ""
}

export const formatCount = (value = 0) => {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed <= 0) return "0"
  if (parsed < 1000) return String(parsed)

  const shortValue = (parsed / 1000).toFixed(parsed >= 10000 ? 0 : 1)
  return `${shortValue.replace(".0", "")}K`
}
