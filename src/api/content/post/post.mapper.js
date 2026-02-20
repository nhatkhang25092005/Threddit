/**
 * Map form/UI data to create post API payload.
 * @param {Object} data - { text, isHadMediaFiles?, mentionedUsers?, mediaFilesNumber?, mediaContentTypes? }
 */
export const mapCreatePost = (data) => ({
  text: data.text ?? '',
  isHadMediaFiles: Boolean(data.isHadMediaFiles),
  mentionedUsers: Array.isArray(data.mentionedUsers) ? data.mentionedUsers : [],
  mediaFilesNumber: Number(data.mediaFilesNumber) || 0,
  mediaContentTypes: Array.isArray(data.mediaContentTypes) ? data.mediaContentTypes : [],
})

/**
 * Map to confirm uploaded media API payload.
 * @param {Object|string[]} data - { mediaKeys } or array of keys
 */
export const mapConfirmContentUploadedMedia = (data) => ({
  mediaKeys: Array.isArray(data?.mediaKeys) ? data.mediaKeys : Array.isArray(data) ? data : [],
})
