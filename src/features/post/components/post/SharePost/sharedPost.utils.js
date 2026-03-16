export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCount = (value = 0) => {
  if (value < 1000) return String(value);

  const shortValue = (value / 1000).toFixed(value >= 10000 ? 0 : 1);
  return `${shortValue.replace(".0", "")}K`;
};

export const resolveMedia = (mediaFiles = []) => (
  [...(Array.isArray(mediaFiles) ? mediaFiles : [])]
    .map((media, index) => ({ ...media, __idx: index }))
    .sort((a, b) => {
      const aOrder = Number.isFinite(a?.sortOrder) ? a.sortOrder : Number.MAX_SAFE_INTEGER;
      const bOrder = Number.isFinite(b?.sortOrder) ? b.sortOrder : Number.MAX_SAFE_INTEGER;
      return aOrder - bOrder || a.__idx - b.__idx;
    })
);

export const resolveSharedPost = (post = {}) => {
  const candidate =
    post?.sharedPost ??
    post?.sharedContent ??
    post?.originalPost ??
    post?.originPost ??
    post?.content;

  if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
    return candidate;
  }

  return null;
};
