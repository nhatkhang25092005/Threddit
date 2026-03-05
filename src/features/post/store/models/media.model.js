export const mediaModel = (media) => ({
  id: media?.id || null,
  sortOrder: media?.sortOrder  || null,
  type: media?.type || "image",
  url: media?.url || null
})