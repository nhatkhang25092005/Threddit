import { mediaModel } from "../store/models/media.model"

const resolveMediaType = (item = {}) => {
  if (typeof item?.type === "string" && !item.type.includes("/")) {
    return item.type
  }

  const rawType = item?.contentType || item?.file?.type || item?.type || ""
  if (typeof rawType === "string" && rawType.includes("/")) {
    return rawType.split("/")[0] || "image"
  }

  return "image"
}

export const extractMediaKeyFromUrl = (url) => {
  if (!url || typeof url !== "string") return null

  try {
    const pathname = new URL(url).pathname.replace(/^\/+/, "")
    return pathname || null
  }
  catch {
    const cleanUrl = url.split("?")[0]?.replace(/^\/+/, "")
    return cleanUrl || null
  }
}

const resolveExistingMediaKey = (item = {}) => (
  item?.mediaKey
  || item?.key
  || item?.storageKey
  || item?.s3Key
  || extractMediaKeyFromUrl(item?.url)
)

export const normalizeEditableMediaList = (media = []) => (
  (Array.isArray(media) ? media : [])
    .filter(Boolean)
    .map((item, index) => ({
      ...item,
      file: item?.file || null,
      mediaKey: resolveExistingMediaKey(item),
      sortOrder: Number.isFinite(item?.sortOrder) ? item.sortOrder : index + 1,
      type: resolveMediaType(item),
      url: item?.url || item?.previewUrl || item?.src || null,
    }))
)

export const getNewEditableMediaList = (mediaList = []) => (
  (Array.isArray(mediaList) ? mediaList : []).filter((item) => item?.file)
)

export const buildEditedContentPayload = ({
  type = "post",
  data = {},
  mediaList = [],
  presignedMediaUrls = [],
  uploadSessionId = null,
}) => {
  const hasExplicitMediaField = Array.isArray(data?.media)
  let uploadCursor = 0
  let hasMissingMediaKey = false

  const mediaFiles = (Array.isArray(mediaList) ? mediaList : [])
    .map((item) => {
      let mediaKey = item?.mediaKey

      if (item?.file) {
        mediaKey = extractMediaKeyFromUrl(presignedMediaUrls[uploadCursor])
        uploadCursor += 1
      }

      if (!mediaKey) {
        hasMissingMediaKey = true
        return null
      }

      return {
        mediaKey,
        sortOrder: item?.sortOrder,
      }
    })
    .filter(Boolean)

  return {
    hasExplicitMediaField,
    hasMissingMediaKey,
    payload: {
      type,
      text: data?.text ?? "",
      mentionedUsers: Array.isArray(data?.mentionedUsers) ? data.mentionedUsers : [],
      ...(hasExplicitMediaField ? { mediaFiles } : {}),
      ...(uploadSessionId ? { uploadSessionId } : {}),
    }
  }
}

const resolveUpdatedContentCandidate = (responseData = {}) => {
  const candidates = [
    responseData?.updatedPost,
    responseData?.updatedStory,
    responseData?.updatedContent,
    responseData?.post,
    responseData?.story,
    responseData?.content,
    responseData,
  ]

  return candidates.find(
    (item) => item && typeof item === "object" && (
      item?.id != null
      || item?.contentId != null
      || typeof item?.text === "string"
      || Array.isArray(item?.mediaFiles)
    )
  ) || null
}

export const buildEditedContentPatch = ({
  type = "post",
  responseData = {},
  data = {},
  mediaList = [],
}) => {
  const updatedContent = resolveUpdatedContentCandidate(responseData)
  const hasExplicitMediaField = Array.isArray(data?.media)
  const fallbackMediaFiles = hasExplicitMediaField
    ? mediaList.map((item) => mediaModel({
      id: item?.id ?? null,
      sortOrder: item?.sortOrder,
      type: item?.type,
      url: item?.url,
    }))
    : null

  return {
    type: updatedContent?.type || type,
    text: updatedContent?.text ?? data?.text ?? "",
    mentionedUsers: Array.isArray(updatedContent?.mentionedUsers)
      ? updatedContent.mentionedUsers
      : (Array.isArray(data?.mentionedUsers) ? data.mentionedUsers : undefined),
    ...(Array.isArray(updatedContent?.mediaFiles)
      ? { mediaFiles: updatedContent.mediaFiles.map((item) => mediaModel(item)) }
      : (Array.isArray(fallbackMediaFiles) ? { mediaFiles: fallbackMediaFiles } : {})),
    time: {
      updatedAt: updatedContent?.updatedAt
        || updatedContent?.contentUpdatedAt
        || new Date().toISOString()
    }
  }
}
