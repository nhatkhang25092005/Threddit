export const mapCreatePost = (data) => ({
  type: data?.type ?? 'post',
  text: data?.text ?? '',
  mentionedUsers: Array.isArray(data?.mentionedUsers)
    ? data.mentionedUsers
    : [],
  ...(data?.uploadSessionId != null && {
    uploadSessionId: data.uploadSessionId
  })
})

/**
 * Map to confirm uploaded media API payload.
 * @param {Object|string[]} data - { mediaKeys } or array of keys
 */
export const mapConfirmContentUploadedMedia = (data) => ({
  mediaKeys: Array.isArray(data?.mediaKeys) ? data.mediaKeys : Array.isArray(data) ? data : [],
})
