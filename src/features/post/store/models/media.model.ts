import type { ExpectMediaInput ,Media } from "../../types/media.type"
import { resolveId, resolveString, resolveNumber } from "../../utils/resolveTypes"

type ExpectMediaKeys = Partial<Record<'mediaKey' | 'key' | 'storageKey' | 's3Key', unknown>>
const resolveMediaKey = (media:ExpectMediaKeys): string => (
  resolveString(
    media?.mediaKey,
    media?.key,
    media?.storageKey,
    media?.s3Key
  )
)

type ExpectMediaUrls = Partial<Record<'url' | 'mediaUrl' | 'fileUrl' | 'src', unknown>>
const resolveMediaUrl = (media: ExpectMediaUrls) => (
  resolveString(
    media?.url,
    media?.mediaUrl,
    media?.fileUrl,
    media?.src
  )
)

type ExpectMediaTypes = Partial<{
  contentType:unknown,
  mediaType:unknown,
  mimeType:unknown, type:unknown,
  file:{type:unknown}
}>
const resolveMediaType = (media: ExpectMediaTypes) => (
  resolveString(
    media?.contentType,
    media?.mediaType,
    media?.mimeType,
    media?.type,
    media?.file?.type
  ) || "image"
)

export const mediaModel = (media: ExpectMediaInput): Media => {
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
    id: resolveId(media?.id ?? media?.mediaId),
    
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
