export const resolveCreatedPostRaw = (responseData = {}, fallbackPayload = {}, currentUser = null) => {
  const candidates = [
      responseData?.createdPost,
      responseData?.post,
      responseData?.createdContent,
      responseData?.content,
      responseData,
    ]
  
    const found = candidates.find(
      (item) => item && typeof item === "object" && (item.id != null || item.contentId != null)
    )
    if (found) return found
  
    const fallbackId = responseData?.id ?? responseData?.contentId
    if (fallbackId == null) return null
  
    return {
      id: fallbackId,
      contentId: fallbackId,
      type: fallbackPayload?.type || "post",
      text: fallbackPayload?.text || "",
      mentionedUsers: fallbackPayload?.mentionedUsers || [],
      mediaFiles: [],
      author: currentUser
        ? {
            username: currentUser.username || null,
            displayName: currentUser.displayName || null,
            avatarUrl: currentUser.avatarUrl || null,
          }
        : null,
    }
}