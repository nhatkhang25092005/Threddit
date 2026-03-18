import { ROUTES } from "../../../../../../constant/routes";

export function buildDetailPostPageRoute(postId, mediaIndex = 0) {
  if (postId == null) {
    return ROUTES.DETAIL_POST;
  }

  const safeIndex = Number.isFinite(Number(mediaIndex))
    ? Math.max(0, Number(mediaIndex))
    : 0;

  return `${ROUTES.DETAIL_POST}/${encodeURIComponent(postId)}/${safeIndex}`;
}

export function getReturnToPath(location) {
  if (!location?.pathname) {
    return "/";
  }

  return `${location.pathname}${location.search || ""}${location.hash || ""}`;
}
