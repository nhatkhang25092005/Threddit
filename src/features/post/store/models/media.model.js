const resolveString = (...values) => (
  values.find((value) => typeof value === "string" && value.trim()) || null
)

const resolveNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const resolveMediaKey = (media = {}) => (
  resolveString(media?.mediaKey, media?.key, media?.storageKey, media?.s3Key)
)

const resolveMediaUrl = (media = {}) => (
  resolveString(media?.url, media?.mediaUrl, media?.fileUrl, media?.src)
)

const resolveMediaType = (media = {}) => (
  resolveString(
    media?.contentType,
    media?.mediaType,
    media?.mimeType,
    media?.type,
    media?.file?.type
  ) || "image"
)

export const mediaModel = (media = {}) => {
  const mediaKey = resolveMediaKey(media)
  const url = resolveMediaUrl(media)
  const type = resolveMediaType(media)
  const contentType = resolveString(
    media?.contentType,
    media?.mimeType,
    media?.mediaType,
    media?.file?.type,
    type
  )

  return {
    id: media?.id ?? media?.mediaId ?? mediaKey ?? null,
    sortOrder: resolveNumber(media?.sortOrder),
    type,
    url,
    contentType,
    contentLength: resolveNumber(media?.contentLength ?? media?.size),
    mediaKey,
    name: resolveString(media?.name, media?.originalName, media?.fileName),
    originalName: resolveString(media?.originalName, media?.fileName, media?.name),
    mediaUrl: resolveString(media?.mediaUrl, media?.fileUrl, url),
    fileUrl: resolveString(media?.fileUrl, media?.mediaUrl, url),
    mimeType: resolveString(media?.mimeType, media?.contentType, media?.mediaType),
  }
}
