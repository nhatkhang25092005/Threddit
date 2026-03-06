export const resolvePinnedStatus = (response, fallback = true) => {
  const candidates = [
    response?.data?.isPinned,
    response?.data?.post?.isPinned,
    response?.data?.content?.isPinned,
    response?.data?.item?.isPinned,
  ]

  const pinnedFromResponse = candidates.find((value) => typeof value === "boolean")
  return pinnedFromResponse ?? fallback
}