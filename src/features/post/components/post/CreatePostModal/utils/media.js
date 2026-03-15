const resolveMediaType = (item = {}) => {
  if (typeof item?.type === "string" && item.type) {
    return item.type.includes("/") ? item.type.split("/")[0] || "image" : item.type
  }

  const rawType = item?.contentType || item?.file?.type || ""
  if (typeof rawType === "string" && rawType.includes("/")) {
    return rawType.split("/")[0] || "image"
  }

  return "image"
}

export const isSoundComposerMedia = (item = {}) => (
  item?.type === "audio" || item?.type === "sound"
)

export const normalizeComposerMediaItem = (item = {}, index = 0) => {
  const hasLocalFile = Boolean(item?.file)
  const previousUrl = item?.url || item?.previewUrl || item?.src || null
  const nextUrl = hasLocalFile
    ? URL.createObjectURL(item.file)
    : previousUrl

  if (hasLocalFile && previousUrl && previousUrl !== nextUrl && previousUrl.startsWith("blob:")) {
    URL.revokeObjectURL(previousUrl)
  }

  return {
    ...item,
    type: resolveMediaType(item),
    sortOrder: Number.isFinite(item?.sortOrder) ? item.sortOrder : index + 1,
    url: nextUrl,
    origin: item?.origin || (hasLocalFile ? "object-url" : "remote"),
  }
}

export const buildInitialMediaItems = ({
  initialMedia = [],
  initialImages = [],
  initialVideos = [],
  initialSounds = [],
} = {}) => {
  const fallbackMedia = [
    ...(Array.isArray(initialImages) ? initialImages : []),
    ...(Array.isArray(initialVideos) ? initialVideos : []),
    ...(Array.isArray(initialSounds) ? initialSounds : []),
  ]

  const source = Array.isArray(initialMedia) && initialMedia.length > 0
    ? initialMedia
    : fallbackMedia

  return source
    .filter(Boolean)
    .map((item, index) => normalizeComposerMediaItem(item, index))
    .sort((left, right) => {
      const leftOrder = Number.isFinite(left?.sortOrder) ? left.sortOrder : Number.MAX_SAFE_INTEGER
      const rightOrder = Number.isFinite(right?.sortOrder) ? right.sortOrder : Number.MAX_SAFE_INTEGER

      return leftOrder - rightOrder
    })
}

export const revokeComposerMediaPreview = (mediaItem) => {
  if (mediaItem?.origin === "object-url" && mediaItem?.url) {
    URL.revokeObjectURL(mediaItem.url)
  }
}

export const prependUploadedMediaItems = (setMediaItems, uploadedItems = []) => {
  if (!Array.isArray(uploadedItems) || uploadedItems.length === 0) return

  setMediaItems((prev) => [
    ...uploadedItems.map((item, index) => normalizeComposerMediaItem(item, index)),
    ...prev,
  ])
}

export const removeComposerMediaByMatcherAtIndex = ({
  index,
  matcher,
  mediaItems = [],
} = {}) => {
  let matchedCursor = -1

  return mediaItems.filter((item) => {
    if (!matcher(item)) return true

    matchedCursor += 1
    const shouldRemove = matchedCursor === index

    if (shouldRemove) {
      revokeComposerMediaPreview(item)
    }

    return !shouldRemove
  })
}

export const mapComposerMediaForSubmit = (mediaItems = []) => (
  (Array.isArray(mediaItems) ? mediaItems : []).map((item, index) => ({
    ...item,
    sortOrder: index + 1,
  }))
)

export const getComposerImages = (mediaItems = []) => (
  (Array.isArray(mediaItems) ? mediaItems : []).filter((item) => item?.type === "image")
)

export const getComposerVideos = (mediaItems = []) => (
  (Array.isArray(mediaItems) ? mediaItems : []).filter((item) => item?.type === "video")
)

export const getComposerSounds = (mediaItems = []) => (
  (Array.isArray(mediaItems) ? mediaItems : []).filter((item) => isSoundComposerMedia(item))
)
