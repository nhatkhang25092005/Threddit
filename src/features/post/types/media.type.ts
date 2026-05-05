export type Media = {
  id:number | null
  sortOrder?:number
  type:string
  url:string
  contentType:string
  contentLength:number
  mediaKey?:string
  name:string
  originalName?:string
  mediaUrl?:string
  fileUrl?:string
  mimeType?:string
}

/**
 * Trade-off:
 * This type allows flexible input by accepting data from many sources, but
 * reduces strictness and may permit incomplete or incorrect data
 */
export type ExpectMediaInput = Partial<Media> & Partial<{
  file:{type:string}
  mediaType:string,
  mediaId:number | null
  size:number
  fileName:string,
  key: unknown
  storageKey: unknown
  s3Key: unknown
  src: unknown
}>

export type ComposerMedia = Media & {
  file?:File | null
  origin?: "object-url" | "remote" | string
}
