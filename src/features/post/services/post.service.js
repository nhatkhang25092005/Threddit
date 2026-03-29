import { handleRequest } from '../../../api/helper'
import { postApi } from '../../../api/content/post/post.api'
import { profileApi } from '../../../api/profile/profile.api'

const hasCursor = (cursor) => (
  cursor !== null &&
  cursor !== undefined &&
  cursor !== ""
)

const resolveSearchItems = (data, keys = []) => {
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key]
  }

  if (Array.isArray(data)) return data

  return []
}

const resolveSearchCursor = (data) => (
  data?.cursor ??
  data?.nextCursor ??
  data?.pagination?.cursor ??
  data?.pagination?.nextCursor ??
  null
)

const resolveSearchHasMore = (data, items = [], cursor = null) => {
  if (items.length === 0) return false

  if (typeof data?.hasMore === "boolean") return data.hasMore
  if (typeof data?.pagination?.hasMore === "boolean") {
    return data.pagination.hasMore
  }

  return hasCursor(cursor)
}

const normalizeSearchBucket = (data, keys = []) => {
  const items = resolveSearchItems(data, keys)
  const cursor = resolveSearchCursor(data)
  const hasMore = resolveSearchHasMore(data, items, cursor)

  return {
    items,
    cursor,
    hasMore,
  }
}

export const postService = {
  getPostContent: async (username, cursor, signal) =>
    handleRequest(() =>postApi.getPostContent(username, cursor, signal)),

  getSavedContent: async (cursor, signal) =>
    handleRequest(() => postApi.getSavedContent(cursor, signal)),

  createPost: async (payload) =>
    handleRequest(() => postApi.createPost({...payload, type:'post'})),

  savePost: async (id) =>
    handleRequest(() => postApi.savePost(id)),

  unsavePost: async (id) =>
    handleRequest(() => postApi.unsavePost(id)),

  sharePost: async (id, payload) =>
    handleRequest(() => postApi.shareContent(id, payload)),

  unsharePost: async (id) =>
    handleRequest(() => postApi.unshareContent(id)),

  pinContent: async (id) =>
    handleRequest(()=> postApi.pinContent(id)),

  unPinContent: async (id) =>
    handleRequest(()=> postApi.unPinContent(id)),

  editPost: async (id, payload) =>
    handleRequest(() => postApi.editContent(id, payload)),

  deletePost: async (id) =>
    handleRequest(() => postApi.deleteContent(id)),

  getPostDetail: async (id, signal) =>
    handleRequest(() => postApi.getPostDetail(id, signal)),

  getFeed: async (signal) =>
    handleRequest(()=> postApi.getFeed(signal)),

  getReel: async (signal) =>
    handleRequest(() => postApi.getReel(signal)),

  search: async (key, signal, cursor = {}, scope = "all") => {
    const shouldSearchContent = scope === "all" || scope === "content"
    const shouldSearchUsers = scope === "all" || scope === "users"

    const [contentSearch, userSearch] = await Promise.all([
      shouldSearchContent
        ? handleRequest(() => postApi.searchContent(key, signal, cursor?.content))
        : Promise.resolve({ success: true, data: null, message: "skip content search" }),
      shouldSearchUsers
        ? handleRequest(() => profileApi.search_profile(key, cursor?.profile, signal))
        : Promise.resolve({ success: true, data: null, message: "skip user search" }),
    ])

    if (!contentSearch.success || !userSearch.success) {
      return {
        success: false,
        message: [
          contentSearch.success ? null : contentSearch.message,
          userSearch.success ? null : userSearch.message,
        ].filter(Boolean).join("\n") || "Search failed",
      }
    }

    const contentResult = shouldSearchContent
      ? normalizeSearchBucket(contentSearch.data, [
        "contents",
        "searchItems",
        "items",
        "results",
        "feedItems",
      ])
      : { items: [], cursor: cursor?.content ?? null, hasMore: undefined }
    const userResult = shouldSearchUsers
      ? normalizeSearchBucket(userSearch.data, [
        "searchProfiles",
        "profiles",
        "users",
        "items",
        "results",
      ])
      : { items: [], cursor: cursor?.profile ?? null, hasMore: undefined }

    return {
      success: true,
      data: {
        users: userResult.items,
        content: contentResult.items,
        cursor: {
          profile: userResult.cursor,
          content: contentResult.cursor,
        },
        hasMore: {
          profile: userResult.hasMore,
          content: contentResult.hasMore,
        },
      },
      message: 'success'
    }
  },
}
